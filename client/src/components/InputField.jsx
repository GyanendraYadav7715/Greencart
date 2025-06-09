const InputField = ({type, name, value, onChange, placeholder }) => {
  return (
    <input
      type= {type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
    />
  );
};

export default InputField;
