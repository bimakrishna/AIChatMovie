import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCompass,
  faUsers,
  faCogs,
  faServer,
  faCloud,
} from "@fortawesome/free-solid-svg-icons";
import cx from "classnames";
import "./style.css";

const Sidebar = ({ onPress1, onPress2 }) => {
  const menuItems = [
    { title: "Search Movie", icon: faCompass, onPress: onPress1 },
    { title: "Favorited", icon: faUsers, onPress: onPress2 },
  ];
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className={cx("sidebar", { "sidebar-closed": !isOpen })}>
      <button className={"sidebar__button"} onClick={() => setIsOpen(!isOpen)}>
        <FontAwesomeIcon icon={faBars} />
      </button>
      <ul>
        {menuItems.map((item) => (
          <li key={item.title} onClick={item.onPress} className={"listButton"}>
            <div className={"sidebar__listItem"}>
              <FontAwesomeIcon className={"sidebar__icon"} icon={item.icon} />
              <CSSTransition
                in={isOpen}
                timeout={200}
                classNames={"fade"}
                unmountOnExit
                style={{ marginLeft: 10 }}
              >
                <span>{item.title}</span>
              </CSSTransition>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
