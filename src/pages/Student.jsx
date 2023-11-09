import React, { useEffect, useState } from "react";

export default function Student() {
  //  hooks variables are function
  const [students, setStudents] = useState([
    { id: 1, name: "jhon", createdAt: 1234556 },
    { id: 2, name: "two", createdAt: 33456678 },
  ]);

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

  return (
    <>
      <div className="container">
        <form className="mt-5">
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
              Check me out
            </label>
          </div>
          <button type="submit" className="btn btn-primary">
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
            </tr>
          </thead>
          <tbody>
            {students.map((cv, index, array) => {
              return (
                <tr>
                  <th scope="row">{cv.id}</th>
                  <td>{cv.name}</td>
                  <td>{cv.createdAt}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
