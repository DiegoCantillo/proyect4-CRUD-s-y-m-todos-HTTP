import React from 'react';

const UsersLists = ({listUsers, updateUser, deleteUser, Toaster, toast}) => {
    return (
        <section>
            <ul>
                {listUsers.map(user => (
                    <li key={user.id}>
                        <div className="info-user">
                            <h3>{user.first_name} {user.last_name}</h3>
                            <p>{user.email}</p>
                            <p><i className="fa-solid fa-cake-candles"></i> {user.birthday}</p>
                        </div>
                        <div className="btn-update-cancel">
                            <button 
                                onClick={()=> {
                                    deleteUser(user.id)
                                    toast.error("Deleted", {duration: 2000})
                                    }}>
                                <i className="fa-solid fa-trash-can"></i>
                            </button>
                            <button onClick={()=> updateUser(user)}><i className="fa-solid fa-pencil"></i></button>
                            <Toaster 
                                toastOptions={{
                                    style:{
                                        padding: "20px",
                                        fontSize: "20px"
                                    }
                            }}/>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default UsersLists;