import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import PeopleOutline from '@mui/icons-material/PeopleOutline';

export default function ChattingPopover(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
        <div>
            <PeopleOutline fontSize="large" aria-owns={open ? 'mouse-over-popover' : undefined}
                aria-haspopup="true"
                onMouseEnter={handlePopoverOpen}
                onMouseLeave={handlePopoverClose} />
            <Popover
                id="mouse-over-popover"
                sx={{
                    pointerEvents: 'none',
                }}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
            >
                <div className='member-header'>현재 인원 수 : {props.members.length}</div>
                {
                    props.members.map((member, index) => (
                        <div key={index} className="member-body">
                            {member}
                        </div>
                    ))
                }

            </Popover>
        </div>
    );
}