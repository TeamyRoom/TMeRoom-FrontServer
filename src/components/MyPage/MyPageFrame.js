import { useState } from "react";
import MyPage from "./MyPage";
import ChangeNickName from "./ChangeNickName";
import ChangeEmail from "./ChangeEmail";
import ChangePassword from "./ChangePassword";

export default function MyPageFrame() {

    const [page, setPage] = useState(0);

    const handlePage = (num) => {
        setPage(num);
    }

    const renderComponent = () => {
        switch (page) {
            case 0: return <MyPage handlePage={handlePage} />;
            case 1: return <ChangeNickName handlePage={handlePage} />;
            case 2: return <ChangeEmail handlePage={handlePage} />;
            case 3: return <ChangePassword handlePage={handlePage} />;
            default: return;
        }
    }

    return (
        <>
            {renderComponent()}
        </>

    )
}