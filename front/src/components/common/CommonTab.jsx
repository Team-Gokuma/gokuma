import styled from "styled-components";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { makeStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";
import { useState } from "react";
import { media } from "../../styles/theme";

const useStyles = makeStyles(() => ({
  customStyleOnTab: {
    fontSize: "22px",
    color: "black",
    fontWeight: "bold",
    textTransform: "none",
  },
  activeTab: {
    fontSize: "22px",
    fontWeight: "bold",
    color: "orange",
    textTransform: "none",
  },
}));
const CommonTab = () => {
  const classes = useStyles();
  const [value, setValue] = useState(2);
  const handleChangeTab = (newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <StAppBar
        onChange={handleChangeTab}
        aria-label="disabled tabs example"
        style={{ backgroundColor: "white" }}
        TabIndicatorProps={{ style: { background: "orange" } }}
        classes={{ indicator: classes.customStyleOnTab }}
        value={value}
        centered>
        <Tab
          label={<span className={value === 0 ? classes.activeTab : classes.customStyleOnTab}> Login</span>}
          to="/login"
          component={Link}
        />
        <Tab className="disabled" label="" disabled value="disabled" display="none" />
        <Tab
          label={<span className={value === 2 ? classes.activeTab : classes.customStyleOnTab}> Sign up</span>}
          to="/signup"
          component={Link}
        />
      </StAppBar>
    </>
  );
};

export default CommonTab;

const StAppBar = styled(Tabs)`
  position: absolute;
  margin: 60px 0px 0px 130px;
  width: 320px;
  height: 48px;
  background-color: ${({ theme }) => theme.color.white};
  color: ${({ theme }) => theme.color.black};


  ${media.mobile} {
    width: 220px;
    margin:5px 0px 0px 55px;
    .disabled{
      display:none;
    }
`;
