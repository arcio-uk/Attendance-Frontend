import { v4 as uuidv4 } from 'uuid';

const randStudentIdGenerator = () => {
  const rand = Math.floor(Math.random() * 100000);
  return `100${rand}`;
};

const TestData = {
  student: {
    name: 'John accostarr',
    modules: [
      {
        name: 'Algorithms and complexity',
        moduleCode: 'CS2869',
        id: 1,
        attendance: 90,
      },
      {
        name: 'AI and prolog',
        moduleCode: 'CS2869',
        id: 2,
        attendance: 0,
      },
      {
        name: 'Information Security',
        moduleCode: 'CS2869',
        id: 3,
        attendance: 99,
      },
      {
        name: 'Team Project',
        moduleCode: 'CS2869',
        id: 4,
        attendance: 50,
      },
    ],
  },
  lecturer: {
    name: 'Dave Cohen',
    modules: [
      {
        name: 'Algorithms and complexity',
        moduleCode: 'CS2869',
        id: 1,
        students: [
          {
            name: 'Jhoon accococostarrr',
            attendance: 69,
            studentID: randStudentIdGenerator(),
            id: uuidv4(),
          },
          {
            name: 'Danny Pooper',
            attendance: 19,
            studentID: randStudentIdGenerator(),
            id: uuidv4(),
          },
          {
            name: 'shrek shreeeeeeeeey',
            attendance: 0,
            studentID: randStudentIdGenerator(),
            id: uuidv4(),
          },
          {
            name: 'Mason Burdick',
            attendance: 20,
            studentID: randStudentIdGenerator(),
            id: uuidv4(),
          },
          {
            name: 'Dylan Coyle',
            attendance: 50,
            studentID: randStudentIdGenerator(),
            id: uuidv4(),
          },
          {
            name: 'Ethan Dolan',
            attendance: 70,
            studentID: randStudentIdGenerator(),
            id: uuidv4(),
          },
          {
            name: 'Garrett Dolan',
            attendance: 80,
            studentID: randStudentIdGenerator(),
            id: uuidv4(),
          },
          {
            name: 'John Doe',
            attendance: 100,
            studentID: randStudentIdGenerator(),
            id: uuidv4(),
          },
          {
            name: 'Jane Doe',
            attendance: 100,
            studentID: randStudentIdGenerator(),
            id: uuidv4(),
          },
          {
            name: 'John Acosta',
            attendance: 69,
            studentID: randStudentIdGenerator(),
            id: uuidv4(),
          },
          {
            name: 'Danny Piper',
            attendance: 19,
            studentID: randStudentIdGenerator(),
            id: uuidv4(),
          },
          {
            name: 'James Arnott',
            attendance: 100,
            studentID: randStudentIdGenerator(),
            id: uuidv4(),
          },
        ],
      },
      {
        name: 'AI and prolog',
        moduleCode: 'CS2869',
        id: 2,
        students: [
          {
            name: 'Jhoon accococostarrr',
            attendance: 69,
            studentID: randStudentIdGenerator(),
            id: uuidv4(),
          },
          {
            name: 'Danny Pooper',
            attendance: 19,
            studentID: randStudentIdGenerator(),
            id: uuidv4(),
          },
          {
            name: 'shrek shreeeeeeeeey',
            attendance: 0,
            studentID: randStudentIdGenerator(),
            id: uuidv4(),
          },
          {
            name: 'Mason Burdick',
            attendance: 20,
            studentID: randStudentIdGenerator(),
            id: uuidv4(),
          },
          {
            name: 'Dylan Coyle',
            attendance: 50,
            studentID: randStudentIdGenerator(),
            id: uuidv4(),
          },
          {
            name: 'Ethan Dolan',
            attendance: 70,
            studentID: randStudentIdGenerator(),
            id: uuidv4(),
          },
          {
            name: 'Garrett Dolan',
            attendance: 80,
            studentID: randStudentIdGenerator(),
            id: uuidv4(),
          },
          {
            name: 'John Doe',
            attendance: 100,
            studentID: randStudentIdGenerator(),
            id: uuidv4(),
          },
          {
            name: 'Jane Doe',
            attendance: 100,
            studentID: randStudentIdGenerator(),
            id: uuidv4(),
          },
          {
            name: 'John Acosta',
            attendance: 69,
            studentID: randStudentIdGenerator(),
            id: uuidv4(),
          },
          {
            name: 'Danny Piper',
            attendance: 19,
            studentID: randStudentIdGenerator(),
            id: uuidv4(),
          },
          {
            name: 'James Arnott',
            attendance: 100,
            studentID: randStudentIdGenerator(),
            id: uuidv4(),
          },
        ],
      },
    ],
  },
};

export default TestData;
