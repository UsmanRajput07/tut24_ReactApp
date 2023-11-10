import React, { useEffect, useState } from "react";

export default function Student() {
  //  hooks variables are function
  const [students, setStudents] = useState([
    { id: 1, name: "jhon", createdAt: 1234556 },
    { id: 2, name: "two", createdAt: 33456678 },
  ]);
  //  define useState();
  const [studentname, setStudentname] = useState("us");

  // setPayload(studentname);

  const submit = () => {
    const payload = {
      data: {
        name: studentname,
      },
    };
    fetch(`http://localhost:1337/api/students`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => console.log(data.data))
      .catch((err) => {
        console.log(err);
      });
  };
  // useeffect is a hooks variable function that is used to actomation call when component is render

  //    useEffect(cbfn, arr)
  //  cbfn => callbackfuntion()=>{};
  //  arr = Array[];
  useEffect(() => {
    fetch(`http://localhost:1337/api/students`)
      .then((res) => res.json())
      .then((data) => {
        let obj = data.data;
        let newobj = obj.map((cv, index, arr) => {
          return {
            id: cv.id,
            name: cv.attributes.name,
            createdAt: cv.attributes.createdAt,
          };
        });
        setStudents(newobj);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const DeleteStudent = (e) => {
    let itemdelete = window.confirm("do you want to delete");
    let x = e.target.closest("tr");
    const deleteItem = e.target.closest("tr").querySelector("th").innerHTML;

    if (itemdelete === true) {
      fetch(`http://localhost:1337/api/students/${deleteItem}`, {
        method: "DELETE",
      })
        .then((res) => {
          res.json();
        })
        .then((data) => {
          console.log(data);
          x.remove();
          alert("deleted Successfully");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <div className="container">
        <form className="mt-5">
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Enter name
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={studentname}
              onChange={(e) => setStudentname(e.target.value)}
              aria-describedby="useranHelp"
            />
          </div>
          <button type="button" className="btn btn-primary" onClick={submit}>
            Submit
          </button>
        </form>
        <br />
        <hr />
        <br />
        <table className="table table-primary">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">createdAt</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map((cv, index, array) => {
              return (
                <tr>
                  <th scope="row">{cv.id}</th>
                  <td>{cv.name}</td>
                  <td>{cv.createdAt}</td>
                  <td>
                    <button className="btn btn-warning btn-sm">edit</button>
                    <button className="btn btn-success btn-sm">view</button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={(e) => {
                        DeleteStudent(e);
                      }}
                    >
                      delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
