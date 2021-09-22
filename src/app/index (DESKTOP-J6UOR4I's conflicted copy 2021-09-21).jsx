import React, { useState, useEffect } from "react";
import TextField from "../ui/text-field";
import DataTable from "../ui/data-table";
import Tr from "./tr";
import json from "../data/people.json";

import "./styles.css";

function pageData({ data, per = 50, page = 1 }) {
  return data.slice(per * (page - 1), per * page);
}
export default function App({}) {
  const [state, setState] = useState({
    data: pageData({ data: json }),
    loading: false,
    page: 1,
    sortedBy: { first_name: "ascending" },
  });

  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!state.sortedBy) return;
    const sortKey = Object.keys(state.sortedBy)[0];
    const direction = state.sortedBy[sortKey];
    setState((prev) => ({
      ...prev,
      data: json.sort((a, b) => {
        return direction === "ascending"
          ? b[sortKey] < a[sortKey]
            ? 1
            : -1
          : b[sortKey] > a[sortKey]
          ? 1
          : -1;
      }),
    }));
  }, [state.sortedBy]);

  function loadMore() {
    if (state.loading) return;
    setState((prev) => ({
      ...prev,
      loading: true,
    }));

    setState((prev) => ({
      ...prev,
      data: [...prev.data, ...pageData({ data: json, page: prev.page + 1 })],
      loading: false,
      page: prev.page + 1,
    }));
  }

  useEffect(() => {
    if (query.length < 3) return;
    setState((prev) => ({
      ...prev,
      data: json.filter((row) => {
        return (
          row.first_name
            .toString()
            .toLowerCase()
            .indexOf(query.toString().toLowerCase()) > -1 ||
          row.last_name
            .toString()
            .toLowerCase()
            .indexOf(query.toString().toLowerCase()) > -1 ||
          row.email_name
            .toString()
            .toLowerCase()
            .indexOf(query.toString().toLowerCase()) > -1
        );
      }),
    }));
  }, [query]);

  return (
    <>
      <TextField
        value={query}
        placeholder='Type here to filter results'
        onChange={(val) => setQuery(val)}
      />
      <DataTable
        loadMore={loadMore}
        items={state.data}
        renderHead={() => (
          <>
            <Tr label='ID' />
            <Tr
              label='First name'
              sortedBy={state.sortedBy}
              sort={{ key: "first_name", changer: setState }}
            />
            <Tr
              label='Last name'
              sortedBy={state.sortedBy}
              sort={{ key: "last_name", changer: setState }}
            />
            <Tr
              label='Email'
              sortedBy={state.sortedBy}
              sort={{ key: "email", changer: setState }}
            />
            <Tr label='Gender' />
            <Tr label='Ip Address' />
          </>
        )}
        renderRow={(row) => (
          <tr>
            <td>{row.id}</td>
            <td>{row.first_name}</td>
            <td>{row.last_name}</td>
            <td>{row.email}</td>
            <td>{row.gender}</td>
            <td>{row.ip_address}</td>
          </tr>
        )}
      />
    </>
  );
}
