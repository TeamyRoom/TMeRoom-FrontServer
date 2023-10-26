import { useState, useEffect } from "react";
import "../../css/MyLecture.css";
import LectureAsStudent from "./LectureAsStudent";
import LectureAsTeacher from "./LectureAsTeacher";
import LectureAsManager from "./LectureAsManager";

import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

export default function MyLecture() {

    const [tabNow, setTabNow] = useState(0);

    const tabComponent = () => {
        switch (tabNow) {
            case 0: return <LectureAsStudent />
            case 1: return <LectureAsTeacher />
            case 2: return <LectureAsManager />
            default: break;
        }
    }

    const handleChange = (event, newValue) => {
        setTabNow(newValue);
    };

    return (
        <>
            <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                <Tabs value={tabNow} onChange={handleChange} centered>
                    <Tab label="학생" value={0}/>
                    <Tab label="강사" value={1}/>
                    <Tab label="관리" value={2}/>
                </Tabs>
            </Box>
            {tabComponent()}
        </>
    )
}