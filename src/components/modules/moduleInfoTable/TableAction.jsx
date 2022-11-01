import React, { useState } from 'react';
import { Button } from 'elementz';
import { sendUsersEmails } from '@/api/ApiClient';
// import { SendMailForm } from '@/components/modules/moduleInfoTable/SendMailForm';
/**
 * Used to set the name of the downloaded file
 * @returns {String} The date
 */
const getDateString = () => {
  const now = new Date();
  const yyyy = now.getFullYear();
  let mm = now.getMonth() + 1; // Months start at 0!
  let dd = now.getDate();

  if (dd < 10) dd = `0${dd}`;
  if (mm < 10) mm = `0${mm}`;

  return `${dd}-${mm}-${yyyy}`;
};

/**
 * This method will be used to download a TSV file for the selected data
 *
 * @param {Object} data The row that contains
 */
const downloadTSV = (data) => {
  if (data.length < 1) return;
  const dataKeys = Object.keys(data[0]);
  const startValue = dataKeys
    .map((x) => x.charAt(0).toUpperCase() + x.substring(1))
    .join('\t')
    .concat('\n');
  const tsvOut = data.reduce((prev, next, index) => {
    let out = prev;
    for (let i = 0; i < dataKeys.length; i++) {
      out += next[dataKeys[i]];
      if (i !== dataKeys.length - 1) out += '\t';
    }
    if (data.length !== index - 1) out += '\n';
    return out;
  }, startValue);
  const element = document.createElement('a');
  const file = new Blob([tsvOut], { type: 'text/plain' });
  element.href = URL.createObjectURL(file);
  element.download = `Attendance-${getDateString()}.tsv`;
  document.body.appendChild(element); // Required for this to work in FireFox
  element.click();
};

const handleMailClick = (data) => {
  //showMail(!mail);
  //sendUsersEmails()
};

const TableAction = ({ row, i, isBulk }) => {
  if (!isBulk) {
    return <Button sm simple icon="more-h" className="icon-bold" />;
  }
  return (
    <div>
      <Button.Group>
        {/* https://www.zwicon.com/cheatsheet.html */}
        <Button sm secondary reverse icon="download" onClick={() => downloadTSV(row)} />
        <Button sm primary reverse icon="mail" onClick={() => handleMailClick(row)} />
        <Button sm warning reverse icon="edit-pencil" />
        <Button sm danger reverse icon="close" />
      </Button.Group>
      {
        //mail && <SendMailForm />
      }
    </div>
  );
};

export default TableAction;
