import React from "react";
import styles from "../styles/Participants.module.scss";
import { useAblyChannel } from "@/hooks/useAblyChannel";

export default function Participants() {
  const { clientId, presenceData } = useAblyChannel('chat');

  const presenceList = presenceData.map((member, index) => { 
    const isItMe = member.clientId === clientId ? "(me)" : "";
    
    return (
      <li key={index} className={styles.participant}>
        <span className={styles.name}>{member.clientId}</span>
        <span className={styles.me}>{isItMe}</span>
      </li>
    );
  });

  return <ul>{presenceList}</ul>;
};