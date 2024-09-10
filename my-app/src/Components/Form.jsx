import React, { useState } from 'react';

const Form = ({ isOpen, setIsOpen, setAlert }) => {

   //initial schemas 
  const initialSchemas = [
    { label: 'First Name', value: 'first_name' },
    { label: 'Last Name', value: 'last_name' },
    { label: 'Gender', value: 'gender' },
    { label: 'Age', value: 'age' },
    { label: 'Account Name', value: 'account_name' },
    { label: 'City', value: 'city' },
    { label: 'State', value: 'state' },
  ];

  const [segmentName, setSegmentName] = useState('');
  const [selectedSchemas, setSelectedSchemas] = useState([]);
  const [selectedSchema, setSelectedSchema] = useState('');

  // Add selected schema to the list of selectedSchemas
  const handleAddSchema = () => {
    if (selectedSchema && !selectedSchemas.some((s) => s.value === selectedSchema)) {
      const schema = initialSchemas.find((s) => s.value === selectedSchema);
      setSelectedSchemas((prevSchemas) => [...prevSchemas, schema]);
      setSelectedSchema(''); //set selected schema to empty
    }
  };

  // Handle change in the dropdown 
  const handleSchemaChange = (index, value) => {
    const newSchema = initialSchemas.find((s) => s.value === value);
    if (newSchema) {
      setSelectedSchemas((prevSchemas) => {
        const updatedSchemas = prevSchemas.map((s, i) => (i === index ? newSchema : s));
        return updatedSchemas;
      });
    }
  };

  // get options except selected items
  const getOptions = (currentValue) => {
    const selectedValues = selectedSchemas.map((s) => s.value);
    return initialSchemas.filter((s) => s.value === currentValue || !selectedValues.includes(s.value));
  };

  // save data to server
  const handleSaveSegment = () => {
    //segmentName and dropdown values
    const dataToSend = {
      segment_name: segmentName,
      schema: selectedSchemas.map((s) => ({ [s.value]: s.label })),
    };
    console.log('Saving data to server:', dataToSend);
    //send data to webhook url using post method
    fetch('https://webhook.site/4749232a-f4d3-488b-86a4-d7c8529c525d', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend),
      mode: 'no-cors',
    })
      .then((response) => {
        setIsOpen(false);
        setAlert("New segment has been created successfully!!!")
        setTimeout(() => setAlert(''), 4000);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-end bg-gray-500 bg-opacity-75">
      <div className="relative bg-white w-1/3 h-full p-6 shadow-lg">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
          onClick={() => setIsOpen(false)}
        >
          &times;
        </button>
        <div className="header flex items-center">
          <span className="w-[24px] block cursor-pointer" onClick={() => setIsOpen(false)}>
            <img src="../arrow-drop-left-line.png" alt="Close" />
          </span>
          <h2 className="text-xl font-bold">Saving Segment</h2>
        </div>
        <div className="mt-4">
          <p>Enter the name of the segment</p>
          <input
            type="text"
            placeholder="Enter segment name"
            value={segmentName}
            onChange={(e) => setSegmentName(e.target.value)}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 w-full"
          />
          <p className="mt-4">To save your segment, you need to build your query.</p>

          <div className="mt-4 bg-blue-100 p-4 rounded-md h-64 overflow-y-auto">
            {selectedSchemas.map((schema, index) => (
              <div key={index} className="mb-2">
                <select
                  value={schema.value}
                  onChange={(e) => handleSchemaChange(index, e.target.value)}
                  className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 bg-white w-full"
                >
                  {getOptions(schema.value).map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
                <p className="mt-2">Selected value: {schema.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-4">
            <select
              value={selectedSchema}
              onChange={(e) => setSelectedSchema(e.target.value)}
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 bg-white w-full"
            >
              <option value="" disabled>
                Select schema to add
              </option>
              {initialSchemas.map((schema) => (
                <option key={schema.value} value={schema.value}>
                  {schema.label}
                </option>
              ))}
            </select>
            <button
              onClick={handleAddSchema}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              + Add new schema
            </button>
          </div>

          <div className="flex gap-6 mt-[70px]">
            <button
              onClick={handleSaveSegment}
              className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Save Segment
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="mt-4 px-4 py-2 bg-gray-500 text-red-200 rounded-md hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
