import classes from './profile-form.module.css';
import { useContext, useState } from 'react';
import {
    NotificationContext,
    Status
} from '../../providers/notification-provider/notification-provider';

async function changePassword(passwordData) {
    const response = await fetch('/api/user/change-password', {
        method: 'PATCH',
        body: JSON.stringify(passwordData),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const data = await response.json();
    if(!response.ok) {
        throw new Error(data.message || 'Something went wrong...')
    } else {
        return data;
    }
}

function ProfileForm() {
    const [newPassword, setNewPassword] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const { toggleNotification } = useContext(NotificationContext);

    function handleNewPasswordChange(e) {
        setNewPassword(e.target.value);
    }

    function handleOldPasswordChange(e) {
        setOldPassword(e.target.value);
    }

    async function handleSubmit(e) {
        e.preventDefault();

        toggleNotification({
            status: Status.PENDING,
            title: 'Sending...',
            message: 'Your request is on its way!'
        });

        try {
            await changePassword({ newPassword, oldPassword });
            toggleNotification({
                status: Status.SUCCESS,
                title: 'Success!',
                message: 'Password is changed successfully!'
            });
        } catch (err) {
            toggleNotification({
                status: Status.ERROR,
                title: 'Error!',
                message: err?.toString() || 'Something went wrong...'
            });
        }
    }

    return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' value={newPassword} onChange={handleNewPasswordChange} />
      </div>
      <div className={classes.control}>
        <label htmlFor='old-password'>Old Password</label>
        <input type='password' id='old-password' value={oldPassword} onChange={handleOldPasswordChange} />
      </div>
      <div className={classes.action}>
        <button type="submit">Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
