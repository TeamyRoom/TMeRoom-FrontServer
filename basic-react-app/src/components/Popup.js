import React from 'react';
import classNames from "classnames";

import styles from "./popup.module.scss";

const Popup = ({onClose}) => {

  const popupOverlayClassProps = classNames(styles.popupOverlay);
  const popupClassProps = classNames(styles.popup);


  return (
    <div className={popupOverlayClassProps}>
    <div className={popupClassProps}>
            <p>화면공유를 허용하시겠습니까?</p>
        <button className={styles.okButton} onClick={onClose}>OK</button>
    </div>
    </div>
  );
}

export default Popup;
