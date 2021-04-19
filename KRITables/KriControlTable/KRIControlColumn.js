import columnFilter from "../../../../UI/TableCommonComponents/ColumnFilter/ColumnFilter";

export const COLUMNS = [
  {
    Header: "S No.",
    accessor: "id",
    Filter: columnFilter,
    disableFilters: true,
  },
  {
    Header: "Control Code",
    accessor: "risk_event_code",
    Filter: columnFilter,
  },
  { Header: "Control Name", accessor: "risk_type", Filter: columnFilter },

  {
    Header: "Control Type",
    accessor: "basel_risk_category",
    Filter: columnFilter,
  },
  {
    Header: "Status",
    accessor: "basel_risk_objective",
    Filter: columnFilter,
  },
  {
    Header: "Owner",
    accessor: "basel_risk_classification",
    Filter: columnFilter,
  },
  {
    Header: "Design Effectiveness",
    accessor: "category_I",
    Filter: columnFilter,
  },
  {
    Header: "Category - I",
    accessor: "category_II",
    Filter: columnFilter,
  },
  {
    Header: "Category - II",
    accessor: "category_III",
    Filter: columnFilter,
  },
  {
    Header: "Category - III",
    accessor: "category_IV",
    Filter: columnFilter,
  },
  {
    Header: "Category - IV",
    accessor: "category_V",
    Filter: columnFilter,
  },
  {
    Header: "Category - V",
    accessor: "category_VI",
    Filter: columnFilter,
  },
  {
    Header: "Category - VI",
    accessor: "category_VII",
    Filter: columnFilter,
  },
  {
    Header: "Category - VII",
    accessor: "category_VIII",
    Filter: columnFilter,
  },
];
