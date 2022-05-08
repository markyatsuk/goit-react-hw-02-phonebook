const Filter = ({ filterValue, onChangeFilter }) => {
  return (
    <label htmlFor="">
      Find contacts by name{' '}
      <input type="text" value={filterValue} onChange={onChangeFilter} />
    </label>
  );
};

export { Filter };
