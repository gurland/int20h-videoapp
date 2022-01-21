import React from 'react';
import './Homepage.scss';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PersonIcon from '@mui/icons-material/Person';

function Homepage() {
    const rooms = [
        {
            id: 1,
            title: 'Title',
            description: 'Description',
            userList: [
                {
                    id: 1,
                    name: 'Username1',
                    profileImage:
                        'https://cdn.discordapp.com/attachments/630887784185331745/934094537452814396/unknown_5.png',
                },
                {
                    id: 2,
                    name: 'Username2',
                    profileImage:
                        'https://cdn.discordapp.com/attachments/630887784185331745/934094537452814396/unknown_5.png',
                },
            ],
        },
        {
            id: 2,
            title: 'Title',
            description: 'Description',
            userList: [
                {
                    id: 1,
                    name: 'Username1',
                    profileImage:
                        'https://cdn.discordapp.com/attachments/630887784185331745/934094537452814396/unknown_5.png',
                },
                {
                    id: 2,
                    name: 'Username2',
                    profileImage:
                        'https://cdn.discordapp.com/attachments/630887784185331745/934094537452814396/unknown_5.png',
                },
            ],
        },
        {
            id: 3,
            title: 'Title',
            description: 'Description',
            userList: [
                {
                    id: 1,
                    name: 'Username1',
                    profileImage:
                        'https://cdn.discordapp.com/attachments/630887784185331745/934094537452814396/unknown_5.png',
                },
                {
                    id: 2,
                    name: 'Username2',
                    profileImage:
                        'https://cdn.discordapp.com/attachments/630887784185331745/934094537452814396/unknown_5.png',
                },
            ],
        },
    ];

    return (
        <div className="card-wrap">
            {rooms.map((item) => (
                <div key={item.id} className="room-card">
                    <div className="card-wrap">
                        <div className="header">
                            <h3>{item.title}</h3>
                            <button className="no-style">
                                <MoreVertIcon />
                            </button>
                        </div>
                        <div className="content">
                            <p className="description">{item.description}</p>
                            <div className="user-wrap">
                                {item.userList.map((user) => (
                                    <img key={user.id} src={user.profileImage}></img>
                                ))}
                            </div>
                        </div>
                        <div className="footer">
                            <div className="status">
                                {item.userList.length}
                                <PersonIcon sx={{ fontSize: 20 }} />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Homepage;
