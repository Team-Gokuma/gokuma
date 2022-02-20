import styled from "styled-components";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { makeStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";
import {useState} from "react";

const useStyles = makeStyles(() => ({
  customStyleOnTab: {
    fontSize: "16px",
    color: "black",
    fontWeight: "bold",
  },
  activeTab: {
    fontSize: "16px",
    color: "black",
    fontWeight: "bold",
    color: "orange"
  },
}));
const CommonTab = () => {
  const classes = useStyles();
  const [value, setValue] = useState(2);
  const handleChangeTab = (newValue) => {
    setValue(newValue);
  };

  return (
        <StAppBar
          onChange={handleChangeTab}
          aria-label="disabled tabs example"
          centered
          style={{ backgroundColor: "white" }}
          TabIndicatorProps={{ style: { background: "orange" } }}
          classes={{ indicator: classes.customStyleOnTab }}
          value={value}>
          <Tab label= {
          <span
            className={value === 0 ? classes.activeTab : classes.customStyleOnTab}
          >
            {" "}
            Login
            </span>
            }
            to='/login' component={Link}
          />
          <Tab label="" disabled value="disabled" />
          <Tab label={
          <span
            className={value === 2 ? classes.activeTab : classes.customStyleOnTab}
          >
            {" "}
            Sign up
            </span>
            }
            to='/signup' component={Link}
          />
        </StAppBar>
  );
};

export default CommonTab;

const StAppBar = styled(Tabs)`
  position: absolute;
  margin: 60px 0px 0px 130px;
  width: 20rem;
  height: 3rem;
  background-color: ${({ theme }) => theme.color.white};
  color: ${({ theme }) => theme.color.black};
  && {
    // background-color: rgba(0, 0, 0, 0.5);
    color: #ff99a0;
    font-size: 5rem;
    font-weight: 800;
  }
`;
