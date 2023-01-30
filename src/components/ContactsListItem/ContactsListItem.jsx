import PropTypes from 'prop-types';
import css from './ContactsListItem.module.css';

const ContactsListItem = ({ id, name, number, onDeleteContact }) => {
  return (
    <li className={css.contactListItem} >
      <p>{name}: {number}</p>
      <button onClick={() => onDeleteContact(id)}>
        Delete
      </button>
    </li>
  )  
};

export default ContactsListItem;

ContactsListItem.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  number: PropTypes.string,
  onDeleteContact: PropTypes.func,
}