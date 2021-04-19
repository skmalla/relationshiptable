// import React, { useState, useEffect } from "react";
// import KRIRiskTable from "./KRITables/KriRiskTable/KRIRiskTable";
// import KRIControlTable from "./KRITables/KriControlTable/KRIControlTable";
// import { Multiselect } from "multiselect-react-dropdown";
// import axios from "axios";
// import Accordion from "@material-ui/core/Accordion";
// import AccordionDetails from "@material-ui/core/AccordionDetails";
// import AccordionSummary from "@material-ui/core/AccordionSummary";
// import Typography from "@material-ui/core/Typography";
// import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

// export const KRI = () => {
//   const [riskTableData, setRiskTableData] = useState([]);

//   const [controlTableData, setControlTableData] = useState([]);

//   //Risk Table Data
//   useEffect(() => {
//     axios
//       .get("https://table-data-42a0a-default-rtdb.firebaseio.com/data.json")
//       .then((res) => {
//         setRiskTableData(res.data);
//       });
//   }, []);

//   //Control Table Data
//   useEffect(() => {
//     axios
//       .get("https://table-data-42a0a-default-rtdb.firebaseio.com/data.json")
//       .then((res) => {
//         setControlTableData(res.data);
//       });
//   }, []);

//   const optionData = [
//     { name: "Risk", id: 1 },
//     { name: "Control", id: 2 },
//   ];

//   const [expanded, setExpanded] = React.useState(false);

//   const handleChange = (panel) => (event, isExpanded) => {
//     setExpanded(isExpanded ? panel : false);
//   };

//   const [options] = useState(optionData);
//   const [isRiskTable, setRiskTable] = useState(false);
//   const [isControlTable, setControlTable] = useState(false);

//   const onSelect = (selectedList, selectedItem) => {
//     if (selectedItem.name === "Risk") setRiskTable(true);
//     if (selectedItem.name === "Control") setControlTable(true);
//   };

//   const onRemove = (selectedList, removedItem) => {
//     if (removedItem.name === "Risk") setRiskTable(false);
//     if (removedItem.name === "Control") setControlTable(false);
//   };

//   return (
//     <div className='stickyacordion mt-2'>
//       <Accordion
//         expanded={expanded === "panel1"}
//         onChange={handleChange("panel1")}
//       >
//         <AccordionSummary
//           expandIcon={<ExpandMoreIcon />}
//           aria-controls='panel1bh-content'
//           id='panel1bh-header'
//         >
//           <p className='panel-heading'>Add Relationships</p>
//         </AccordionSummary>
//         <AccordionDetails>
//           <Typography>
//             <div>
//               <div className='row'>
//                 <span className='ml-3 pt-3'>
//                   <p className='panel-heading'>Relationship Table</p>
//                 </span>
//                 <span className='form-group'>
//                   <Multiselect
//                     options={options}
//                     onSelect={onSelect}
//                     onRemove={onRemove}
//                     displayValue='name'
//                   />
//                 </span>
//               </div>
//             </div>
//             {/* {isRiskTable && <KRIRiskTable riskTableData={riskTableData} />}
//             {isControlTable && (
//               <KRIControlTable controlTableData={controlTableData} />
//             )} */}
//           </Typography>
//         </AccordionDetails>
//       </Accordion>
//       {isRiskTable && (
//         <Accordion
//           expanded={expanded === "panel2"}
//           onChange={handleChange("panel2")}
//           className='table-responsive'
//         >
//           <AccordionSummary
//             expandIcon={<ExpandMoreIcon />}
//             aria-controls='panel2bh-content'
//             id='panel1bh-header'
//           >
//             <p className='panel-heading'>Risk</p>
//           </AccordionSummary>
//           <AccordionDetails>
//             <Typography>
//               <KRIRiskTable riskTableData={riskTableData} />
//             </Typography>
//           </AccordionDetails>
//         </Accordion>
//       )}
//       {isControlTable && (
//         <Accordion
//           expanded={expanded === "panel3"}
//           onChange={handleChange("panel3")}
//           className='table-responsive'
//         >
//           <AccordionSummary
//             expandIcon={<ExpandMoreIcon />}
//             aria-controls='panel3bh-content'
//             id='panel1bh-header'
//           >
//             <p className='panel-heading'>Control</p>
//           </AccordionSummary>
//           <AccordionDetails>
//             <Typography>
//               <KRIControlTable controlTableData={controlTableData} />
//             </Typography>
//           </AccordionDetails>
//         </Accordion>
//       )}
//     </div>
//   );
// };

import React, { useState, useEffect } from "react";
import KRIRiskTable from "./KRITables/KriRiskTable/KRIRiskTable";
import KRIControlTable from "./KRITables/KriControlTable/KRIControlTable";
import { Multiselect } from "multiselect-react-dropdown";
import axios from "axios";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const a11yProps = (index) => {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: "#eef0f6",
  },
}));

export const KRI = (props) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const classes = useStyles();

  const [value, setValue] = React.useState(0);

  const handleTabsChange = (event, newValue) => {
    setValue(newValue);
  };

  const [riskTableData, setRiskTableData] = useState([]);

  const [controlTableData, setControlTableData] = useState([]);

  //Risk Table Data
  useEffect(() => {
    axios
      .get("https://table-data-42a0a-default-rtdb.firebaseio.com/data.json")
      .then((res) => {
        setRiskTableData(res.data);
      });
  }, []);

  //Control Table Data
  useEffect(() => {
    axios
      .get("https://table-data-42a0a-default-rtdb.firebaseio.com/data.json")
      .then((res) => {
        setControlTableData(res.data);
      });
  }, []);

  const optionData = [
    { name: "Risk", id: 1 },
    { name: "Control", id: 2 },
  ];

  const [options] = useState(optionData);
  const [isRiskTable, setRiskTable] = useState(false);
  const [isControlTable, setControlTable] = useState(false);

  const onSelect = (selectedList, selectedItem) => {
    if (selectedItem.name === "Risk") setRiskTable(true);
    if (selectedItem.name === "Control") setControlTable(true);
  };

  const onRemove = (selectedList, removedItem) => {
    if (removedItem.name === "Risk") setRiskTable(false);
    if (removedItem.name === "Control") setControlTable(false);
  };

  return (
    <div className='mt-2'>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1bh-content'
          id='panel1bh-header'
        >
          <p className='panel-heading'>Add Relationships</p>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <div>
              <div className='row'>
                <span className='ml-3 pt-3'>
                  <p className='panel-heading'>Relationship Table</p>
                </span>
                <span className='form-group'>
                  <Multiselect
                    options={options}
                    onSelect={onSelect}
                    onRemove={onRemove}
                    displayValue='name'
                  />
                </span>
              </div>
            </div>
            <div className={classes.root}>
              <Tabs
                value={value}
                onChange={handleTabsChange}
                indicatorColor='primary'
                textColor='primary'
                variant='scrollable'
                scrollButtons='auto'
                aria-label='scrollable auto tabs example'
              >
                {isRiskTable && <Tab label='Risk' {...a11yProps(0)} />}
                {isControlTable && <Tab label='Control' {...a11yProps(1)} />}
              </Tabs>

              {isRiskTable && (
                <TabPanel value={value} index={0}>
                  <KRIRiskTable riskTableData={riskTableData} />
                </TabPanel>
              )}
              {isControlTable && (
                <TabPanel value={value} index={1}>
                  <KRIControlTable controlTableData={controlTableData} />
                </TabPanel>
              )}
            </div>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

// import React, { Component } from "react";
// import { withStyles, AppBar, Tabs, Tab, Grid, Button } from "@material-ui/core";
// import Add from "@material-ui/icons/Add";
// import Close from "@material-ui/icons/Close";
// import cloneDeep from "lodash/cloneDeep";

// const styles = (theme) => ({
//   root: {
//     flexGrow: 1,
//     marginTop: "60px",
//     width: "100%",
//     backgroundColor: theme.palette.background.paper,
//   },
//   appBar: {
//     color: "inherit",
//     backgroundColor: theme.palette.background.paper,
//   },
// });

// class CustomTabs extends Component {
//   constructor(...args) {
//     super(...args);
//     this.state = {
//       value: 0,
//       tabList: [
//         {
//           key: 0,
//           id: 0,
//         },
//       ],
//     };
//   }

//   addTab = () => {
//     this.setState((state, props) => {
//       let tabList = cloneDeep(state.tabList);
//       let id = tabList[tabList.length - 1].id + 1;
//       tabList.push({
//         key: id,
//         id: id,
//       });

//       return {
//         tabList,
//       };
//     });
//   };

//   deleteTab = (e) => {
//     // prevent MaterialUI from switching tabs
//     e.stopPropagation();

//     // Cases:
//     // Case 1: Single tab.
//     // Case 2: Tab on which it's pressed to delete.
//     // Case 3: Tab on which it's pressed but it's the first tab
//     // Case 4: Rest all cases.
//     // Also cleanup data pertaining to tab.

//     // Case 1:
//     if (this.state.tabList.length === 1) {
//       return; // If you want all tabs to be deleted, then don't check for this case.
//     }

//     // Case 2,3,4:
//     let tabID = parseInt(e.target.id);
//     let tabIDIndex = 0;

//     let tabList = this.state.tabList.filter((value, index) => {
//       if (value.id === tabID) {
//         tabIDIndex = index;
//       }
//       return value.id !== tabID;
//     });

//     this.setState(
//       (state, props) => {
//         let curValue = parseInt(state.value);
//         if (curValue === tabID) {
//           // Case 3:
//           if (tabIDIndex === 0) {
//             curValue = state.tabList[tabIDIndex + 1].id;
//           }
//           // Case 2:
//           else {
//             curValue = state.tabList[tabIDIndex - 1].id;
//           }
//         }
//         return {
//           value: curValue,
//         };
//       },
//       () => {
//         this.setState({
//           tabList: tabList,
//         });
//       }
//     );
//   };

//   handleTabChange = (event, value) => {
//     this.setState({ value });
//   };

//   render() {
//     const { classes } = this.props;
//     const { value } = this.state;
//     // console.log(this.state);
//     return (
//       <AppBar position='static' className={classes.appBar}>
//         <Grid container alignItems='center' justify='center'>
//           <Grid item xl={11} lg={11} md={11} sm={11} xs={11}>
//             <Tabs
//               value={value}
//               onChange={this.handleTabChange}
//               indicatorColor='primary'
//               textColor='primary'
//               variant='scrollable'
//               scrollButtons='auto'
//             >
//               {this.state.tabList.map((tab) => (
//                 <Tab
//                   key={tab.key.toString()}
//                   value={tab.id}
//                   label={"Node " + tab.id}
//                   icon={<Close id={tab.id} onClick={this.deleteTab} />}
//                   className='mytab'
//                 />
//               ))}
//             </Tabs>
//           </Grid>
//           <Grid item xl={1} lg={1} md={1} sm={1} xs={1}>
//             <Button variant='outlined' onClick={this.addTab}>
//               <Add />
//             </Button>
//           </Grid>
//         </Grid>
//       </AppBar>
//     );
//   }
// }

// export default withStyles(styles)(CustomTabs);

/*next code*/

// import React from "react";
// import { v4 as uuidv4 } from "uuid";
// import "./KRI.css";

// export class KRI extends React.Component {
//   state = {
//     tabs: [
//       { id: 1, name: "Tab 1", content: "Wow this is tab 1" },
//       { id: 2, name: "Tab 2", content: "Look at me, it's Tab 2" },
//     ],
//     currentTab: { id: 1, name: "Tab 1", content: "Wow this is tab 1" },
//     editMode: false,
//     editTabNameMode: false,
//   };

//   handleDoubleClick = () => {
//     this.setState({
//       editTabNameMode: true,
//     });
//   };

//   handleEditTabName = (e) => {
//     const { currentTab, tabs } = this.state;

//     const updatedTabs = tabs.map((tab) => {
//       if (tab.id === currentTab.id) {
//         return {
//           ...tab,
//           name: e.target.value,
//         };
//       } else {
//         return tab;
//       }
//     });

//     this.setState({
//       tabs: updatedTabs,
//       currentTab: {
//         ...currentTab,
//         name: e.target.value,
//       },
//     });
//   };

//   handleOnBlur = () => {
//     this.setState({
//       editTabNameMode: false,
//     });
//   };

//   createTabs = () => {
//     const { tabs, currentTab, editTabNameMode } = this.state;

//     const allTabs = tabs.map((tab) => {
//       return (
//         <li>
//           {editTabNameMode && currentTab.id === tab.id ? (
//             <input
//               value={tab.name}
//               onBlur={this.handleOnBlur}
//               onChange={this.handleEditTabName}
//             />
//           ) : (
//             <button
//               className={currentTab.id === tab.id ? "tab active" : "tab"}
//               onClick={() => this.handleSelectTab(tab)}
//               onDoubleClick={() => this.handleDoubleClick(tab)}
//             >
//               {tab.name}
//             </button>
//           )}
//         </li>
//       );
//     });

//     return <ul className='nav nav-tabs'>{allTabs}</ul>;
//   };

//   handleSelectTab = (tab) => {
//     this.setState({
//       currentTab: tab,
//       editMode: false,
//       editTabNameMode: false,
//     });
//   };

//   handleAddTab = () => {
//     const { tabs } = this.state;

//     const newTabObject = {
//       id: uuidv4(),
//       name: `Tab ${tabs.length + 1}`,
//       content: `This is Tab ${tabs.length + 1}`,
//     };

//     this.setState({
//       tabs: [...tabs, newTabObject],
//       currentTab: newTabObject,
//       editMode: false,
//       editTabNameMode: false,
//     });
//   };

//   handleDeleteTab = (tabToDelete) => {
//     const { tabs } = this.state;
//     const tabToDeleteIndex = tabs.findIndex((tab) => tab.id === tabToDelete.id);

//     const updatedTabs = tabs.filter((tab, index) => {
//       return index !== tabToDeleteIndex;
//     });

//     const previousTab =
//       tabs[tabToDeleteIndex - 1] || tabs[tabToDeleteIndex + 1] || {};

//     this.setState({
//       tabs: updatedTabs,
//       editMode: false,
//       editTabNameMode: false,
//       currentTab: previousTab,
//     });
//   };

//   setEditMode = () => {
//     this.setState({
//       editMode: !this.state.editMode,
//     });
//   };

//   handleContentChange = (e) => {
//     const { tabs, currentTab } = this.state;

//     const updatedTabs = tabs.map((tab) => {
//       if (tab.name === currentTab.name) {
//         return {
//           ...tab,
//           content: e.target.value,
//         };
//       } else {
//         return tab;
//       }
//     });

//     this.setState({
//       tabs: updatedTabs,
//       currentTab: {
//         ...currentTab,
//         content: e.target.value,
//       },
//     });
//   };

//   render() {
//     const { currentTab, editMode } = this.state;
//     return (
//       <div className='container'>
//         <div className='well'>
//           <button className='add-tab-button' onClick={this.handleAddTab}>
//             <i className='text-primary fas fa-plus-square' /> Add Tab
//           </button>
//           {this.createTabs()}
//           <div className='tab-content'>
//             {editMode ? (
//               <div>
//                 <textarea
//                   onChange={this.handleContentChange}
//                   value={this.state.currentTab.content}
//                 />
//                 <button className='save-button' onClick={this.setEditMode}>
//                   Done
//                 </button>
//               </div>
//             ) : (
//               <div>
//                 <p>{currentTab.content}</p>
//                 {currentTab.id ? (
//                   <div
//                     style={{ display: "flex", justifyContent: "space-between" }}
//                   >
//                     <button
//                       className='edit-mode-button'
//                       onClick={this.setEditMode}
//                     >
//                       Edit
//                     </button>
//                     <button onClick={() => this.handleDeleteTab(currentTab)}>
//                       Delete
//                     </button>
//                   </div>
//                 ) : (
//                   ""
//                 )}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     );
//   }
// }
