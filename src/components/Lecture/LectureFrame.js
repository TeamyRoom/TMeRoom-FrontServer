import { accessLecture, call, getAccessToken } from "../../service/ApiService";
import Lecture from "./Lecture";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import Login from "../SinglePage/Login";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function LectureFrame() {
    const { lecturecode } = useParams();
    const [lecturename, setLecturename] = useState('');
    const [nickname, setNickname] = useState('');
    const [role, setRole] = useState('');
    const [ready, setReady] = useState(false);
    const [message, setMessage] = useState('');
    const [open, setOpen] = useState(false);
    const [openApply, setOpenApply] = useState(false);
    const handleClose = () => {
        setOpen(false);
        setOpenApply(false);
    };
    const loginRef = useRef({});

    useEffect(() => {

        if (getAccessToken() === null) {
            loginRef.current.modalOpen();
        }
        else {

            accessLecture(lecturecode)
                .then((response) => {
                    if (response.resultCode !== "SUCCESS") {
                        if (response.resultCode === "INVALID_ACCESS_PERMISSION") {
                            setOpenApply(true);
                        }
                        else {
                            setMessage(response.result);
                            setOpen(true);
                        }
                    }
                    else {
                        const chatServerId = lecturecode.charCodeAt([0]) % 4;
                        document.cookie = `serverid=${chatServerId}; path=/;`;
                        console.log("서버아이디는 ? ", chatServerId);
                        setLecturename(response.result.lectureName);
                        setNickname(response.result.nickName);
                        setRole(response.result.role);
                        return true;
                    }

                })
                .then((render) => { if (render) setReady(true) })
                .catch(e => { console.log(e); });

        }

    }, []);

    const apply = () => {
        handleClose();
        call(`/lecture/${lecturecode}/application`, "POST")
            .then(() => {
                setMessage("수강신청 되었습니다.");
                setOpen(true);
            });
    }

    return (
        <>
            {ready &&
                <Lecture lecturecode={lecturecode} lecturename={lecturename} nickname={nickname} role={role} />
            }
            <Login ref={loginRef} />
            <div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            안내
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            {message}
                        </Typography>
                        <Button className="alert-button" onClick={() => window.location.href = "/"}>확인</Button>
                    </Box>
                </Modal>
            </div>
            <div>
                <Modal
                    open={openApply}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            신청
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            해당 강의에 수강신청 하시겠습니까?
                        </Typography>
                        <Button className="apply-button" onClick={() => apply()}>예</Button>
                        <button className="reject-button" onClick={() => window.location.href = "/"}>아니오</button>
                    </Box>
                </Modal>
            </div>
        </>
    )
}

export default LectureFrame;