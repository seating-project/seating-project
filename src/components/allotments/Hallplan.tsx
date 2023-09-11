"use client";

import jsPDF from "jspdf";
import autoTable, { Table } from "jspdf-autotable";
import React from "react";
import { Button } from "../ui/button";

type Props = {};

const Hallplan = () => {
  const doc = new jsPDF();

  autoTable(doc, {
    body: [
      [
        {
          content: "Skillrack Assessment Batch I (III Year)",
          colSpan: 5,
        },
      ],
      [
        {
          content: "Hall Arrangement - 2023-09-07 (09:45:00 - 10:45:00)",
          colSpan: 5,
        },
      ],
      [
        {
          content: "S.No",
          rowSpan: 2,
          colSpan: 1,
        },
        {
          content: "Hall No",
          rowSpan: 2,
          colSpan: 1,
        },
        {
          content: "RegisterNo.",
          colSpan: 2,
          rowSpan: 1,
        },
        {
          content: "Total",
          rowSpan: 2,
          colSpan: 1,
        },
      ],
      [
        {
          content: "From",
        },
        {
          content: "To",
        },
      ],
      [
        {
          content: "UG Students",
          colSpan: 5,
        },
      ],
      [
        {
          content: "Branch: CIVIL 3rd Year",
          colSpan: 5,
        },
      ],
      [
        {
          content: "1",
          styles: {
            fontSize: 14,
          },
        },
        {
          content: "S5\nSecond Floor",
          styles: {
            fontSize: 14,
          },
        },
        {
          content: "210421103002",
          styles: {
            fontSize: 14,
          },
        },
        {
          content: "210421103301",
          styles: {
            fontSize: 14,
          },
        },
        {
          content: "22",
          styles: {
            fontSize: 14,
          },
        },
      ],
      [
        {
          content: "Total Students ",
          colSpan: 4,
          styles: {
            halign: "right",
            fontStyle: "bold",
            fontSize: 14,
          },
        },
        {
          content: "22",
          styles: {
            fontStyle: "bold",
            fontSize: 14,
          },
        },
      ],
      [
        {
          content: "Branch: CSE 3rd Year",
          colSpan: 5,
        },
      ],
      [
        {
          content: "1",
          styles: {
            fontSize: 14,
          },
        },
        {
          content: "S5\nSecond Floor",
          styles: {
            fontSize: 14,
          },
        },
        {
          content: "210421104001",
          styles: {
            fontSize: 14,
          },
        },
        {
          content: "210421104009",
          styles: {
            fontSize: 14,
          },
        },
        {
          content: "9",
          styles: {
            fontSize: 14,
          },
        },
      ],
      [
        {
          content: "2",
          styles: {
            fontSize: 14,
          },
        },
        {
          content: "S6\nSecond Floor",
          styles: {
            fontSize: 14,
          },
        },
        {
          content: "210421104010",
          styles: {
            fontSize: 14,
          },
        },
        {
          content: "210421104041",
          styles: {
            fontSize: 14,
          },
        },
        {
          content: "31",
          styles: {
            fontSize: 14,
          },
        },
      ],
      [
        {
          content: "3",
        },
        {
          content: "Digital Library",
          styles: {
            fontSize: 14,
          },
        },
        {
          content: "210421104042",
          styles: {
            fontSize: 14,
          },
        },
        {
          content: "210421104053",
          styles: {
            fontSize: 14,
          },
        },
        {
          content: "12",
          styles: {
            fontSize: 14,
          },
        },
      ],
      [
        {
          content: "Total Students ",
          colSpan: 4,
          styles: {
            halign: "right",
            fontStyle: "bold",
            fontSize: 14,
          },
        },
        {
          content: "52",
          styles: {
            fontStyle: "bold",
            fontSize: 14,
          },
        },
      ],
      [
        {
          content: "Overall Total Students ",
          colSpan: 4,
          styles: {
            halign: "right",
            fontStyle: "bold",
          }
        },
        {
          content: "74",
          styles: {
            fontStyle: "bold",
          }
        }
      ],
    ],
    theme: "grid",
    styles: {
      valign: "middle",
      halign: "center",
      fontSize: 16,
      lineWidth: 0.5,
      lineColor: [0, 0, 0],
    },
  });

  return (
    <>
      <Button onClick={() => doc.save("hallplan.pdf")}>
        Download Hallplan
      </Button>
    </>
  );
};

export default Hallplan;
