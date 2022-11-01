import FeatureTable from './FeatureTable';

export default {
  title: "Feature table",
  component: FeatureTable
}

const Template = (args) => <FeatureTable {...args} />

export const Primary = Template.bind({});

const headCells = [
  {
    id: "name",
    numeric: false,
    padding: "normal",
    label: "Name",
    align: "left",
    searchable: true,
  },
  {
    id: "attendance",
    numberic: true,
    padding: "normal",
    label: "Attendance",
    align: "right",
    searchable: true,
  }
]

const testData = [];

const generateRandomId = (length) => {
  const alphabet = "abcdefghijklmnopqrstuvwxyz1234567890";
  let returnString = "";
  for (let i = 0; i < length; i++) {
    returnString += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
  }
  return returnString;
}

const dataNumber = 1000

for (let i = 0; i < dataNumber; i++) {
  testData.push({
    name: generateRandomId(20),
    attendance: Math.floor(Math.random() * 100)
  })
}

Primary.args = {
  title: "Feature Table Test",
  headers: headCells,
  selected: [],
  setSelected: () => {},
  data: testData,
}
