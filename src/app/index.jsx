import React, { useState } from "react";
import DataTable from "./datatable";
import json from "../data/photos.json";

function pageData({ data, per = 50, page = 1 }) {
  debugger;
  return data.slice(per * (page - 1), per * page);
}
export default function App({}) {
  const [state, setState] = useState({
    loading: false,
    page: 1,
    photos: pageData({ data: json }),
  });

  function loadMore() {
    if (state.loading) return;
    setState((prev) => ({
      ...prev,
      loading: true,
    }));

    setState((prev) => ({
      photos: [
        ...prev.photos,
        ...pageData({ data: json, page: prev.page + 1 }),
      ],
      loading: false,
      page: prev.page + 1,
    }));
  }
  return (
    <DataTable
      loadMore={loadMore}
      items={state.photos}
      renderHead={() => (
        <tr>
          <th>ID</th>
          <th>Album ID</th>
          <th>title</th>
          <th>Thumbnail</th>
        </tr>
      )}
      renderRow={(row) => (
        <tr>
          <td>{row.id}</td>
          <td>{row.albumId}</td>
          <td>{row.title}</td>
          <td>
            <img src={row.thumbnailUrl} alt='' />
          </td>
        </tr>
      )}
    />
  );
}
