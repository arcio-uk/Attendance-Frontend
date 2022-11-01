import React, { useEffect, useState } from "react";
import FeatureTable from "../ui/FeatureTable";
import { useParams } from "react-router";
import { getModuleGroupStudents } from "@/api/ApiClient";

const headCells = [
  {
    id: "name",
    numeric: false,
    padding: "none",
    label: "Name",
    align: "left",
    searchable: true,
  },
  {
    id: "attendance",
    numeric: true,
    padding: "normal",
    label: "Attendance",
    align: "left",
    searchable: true,
  },
];

const calculateAttendance = (marked, total) => {
  if (total == 0) return 0;
  return Math.floor((marked / total) * 100);
};

const LectureModuleGroup = () => {
  const [moduleGroup, setModuleGroup] = useState([]);
  const [tableSelected, setTableSelected] = useState([]);

  const { moduleId, moduleGroupId } = useParams();

  useEffect(() => {
    getModuleGroupStudents(moduleGroupId).then((res) => {
      if (res.data.length == 0) return;

      const data = {
        moduleGroupId: res.data["module-group-id"],
        moduleGroupName: res.data["module-group-name"],
        students: [],
      };
      data.students = res.data.users.map((user) => {
        return {
          name: `${user.firstname} ${user.surname}`,
          attendance: calculateAttendance(
            user.attendance["marked-sessions"],
            user.attendance["total-sessions"]
          ),
        };
      });

      setModuleGroup(data);
    });
  }, [moduleId, moduleGroupId]);

  const getModuleGroupName = () => {
    if (moduleGroup.length == 0) return "Loading...";
    return moduleGroup.moduleGroupName;
  };

  return (
    <div className="w-full p-2">
      <div className="w-full my-2">
        <h1 className="text-3xl font-medium text-shadow-md">
          {getModuleGroupName()}
        </h1>
      </div>
      <FeatureTable
        title="Module Group Students"
        data={moduleGroup.length === 0 ? [] : moduleGroup.students}
        selected={tableSelected}
        setSelected={setTableSelected}
        headers={headCells}
      />
    </div>
  );
};
export default LectureModuleGroup;
