import columnFilter from "../../../../UI/TableCommonComponents/ColumnFilter/ColumnFilter";

export const COLUMNS = [
  {
    Header: "S No.",
    accessor: "id",
    Filter: columnFilter,
    disableFilters: true,
  },
  {
    Header: "Risk Event Code",
    accessor: "risk_event_code",
    Filter: columnFilter,
  },
  { Header: "Risk Type", accessor: "risk_type", Filter: columnFilter },
  { Header: "Risk Event", accessor: "risk_event", Filter: columnFilter },
  {
    Header: "Basel Risk Category",
    accessor: "basel_risk_category",
    Filter: columnFilter,
  },
  {
    Header: "Basel Risk Objective",
    accessor: "basel_risk_objective",
    Filter: columnFilter,
  },
  {
    Header: "Basel Risk Classification",
    accessor: "basel_risk_classification",
    Filter: columnFilter,
  },
  {
    Header: "Category - I",
    accessor: "category_I",
    Filter: columnFilter,
  },
  {
    Header: "Category - II",
    accessor: "category_II",
    Filter: columnFilter,
  },
  {
    Header: "Category - III",
    accessor: "category_III",
    Filter: columnFilter,
  },
  {
    Header: "Category - IV",
    accessor: "category_IV",
    Filter: columnFilter,
  },
  {
    Header: "Category - V",
    accessor: "category_V",
    Filter: columnFilter,
  },
  {
    Header: "Category - VI",
    accessor: "category_VI",
    Filter: columnFilter,
  },
  {
    Header: "Category - VII",
    accessor: "category_VII",
    Filter: columnFilter,
  },
  {
    Header: "Category - VIII",
    accessor: "category_VIII",
    Filter: columnFilter,
  },
];
