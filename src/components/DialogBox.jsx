import PropTypes from 'prop-types'
import { deletePost } from '../utils'

export default function DialogBox({title, name, date, handleModal, post, dialogRef}){
   return ( <dialog ref={dialogRef}>
        <h3>{title}</h3>
        <h4>by {name}</h4>
        <h5>{date}</h5>
        <h2>Are you sure you want to delete this?</h2>
        <button onClick={() => handleModal(true)}>No</button>
        <button onClick={() => {deletePost(post); handleModal(true, post, true)}}>Yes</button>
    </dialog> )
}
DialogBox.propTypes = {
    title: PropTypes.string,
    name: PropTypes.string,
    date: PropTypes.string,
    handleModal: PropTypes.func,
    post: PropTypes.string,
    dialogRef: PropTypes.object
}