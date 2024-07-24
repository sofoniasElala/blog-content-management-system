import PropTypes from 'prop-types'
import { deletePost, notificationPopUp } from '../utils'

export default function DialogBox({title, name, date, handleModal, post, postIndex, dialogRef}){
   return ( <dialog ref={dialogRef}>
        <h3>{title}</h3>
        <h4>by {name}</h4>
        <h5>{date}</h5>
        <h2>Are you sure you want to delete this?</h2>
        <button onClick={() => handleModal(true)}>No</button>
        <button onClick={() => {notificationPopUp(deletePost(post), {pending: 'Deleting post...', success: 'Post deleted'}, 3000); handleModal(true, postIndex, true)}}>Yes</button>
    </dialog> )
}
DialogBox.propTypes = {
    title: PropTypes.string,
    name: PropTypes.string,
    date: PropTypes.string,
    handleModal: PropTypes.func,
    post: PropTypes.string,
    postIndex: PropTypes.number,
    dialogRef: PropTypes.object
}