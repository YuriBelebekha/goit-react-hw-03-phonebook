import PropTypes from 'prop-types';
// import css from './Filter.module.css';

const Filter = ({ filter, onChange }) => {
  return (
    <label>
      Find contacts by name
      <input
        type="text"
        value={filter}
        onChange={onChange}
      />
    </label>
  )
};

export default Filter;

Filter.propTypes = {
  filter: PropTypes.string,
  onChange: PropTypes.func,
};