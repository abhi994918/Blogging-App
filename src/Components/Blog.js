//Blogging App using Hooks
import { type } from "@testing-library/user-event/dist/type";
import { useState, useRef, useEffect, useReducer } from "react";
import { db } from "../firebaseInit";
import {
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";

// function blogsReducer(state, action) {
//   switch (action.type) {
//     case "Add":
//       return [action.blog, ...state];
//     case "Remove":
//       return state.filter((blog, index) => index !== action.index);
//     default:
//       return [];
//   }
// }

export default function Blog() {
  // const [title, setTitle] = useState("");
  // const [content, setcontent] = useState("");
  const [formData, setFormData] = useState({ title: "", content: "" });
  const [blogs, setBlogs] = useState([]);

  // const [blogs, dispatch] = useReducer(blogsReducer, []);

  const titleRef = useRef(null);

  useEffect(() => titleRef.current.focus(), []);

  useEffect(() => {
    if (blogs.length && blogs[0].title) {
      document.title = blogs[0].title;
    } else {
      document.title = "Add Blog!!";
    }
  }, [blogs]);

  useEffect(() => {
    // async function fetchData() {
    //   const Snapshot = await getDocs(collection(db, "Blogs"));
    //   const blogs = Snapshot.docs.map((doc) => {
    //     return {
    //       id: doc.id,
    //       ...doc.data(),
    //     };
    //   });
    //   console.log(blogs);
    //   setBlogs(blogs);
    // }

    // fetchData();
    const onSnap = onSnapshot(collection(db, "Blogs"), (snapShot) => {
      const blogs = snapShot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      console.log(blogs);
      setBlogs(blogs);
    });
  }, []);

  //Passing the synthetic event as argument to stop refreshing the page on submit
  async function handleSubmit(e) {
    e.preventDefault();
    // setBlogs([{ title: formData.title, content: formData.content }, ...blogs]);

    const docRef = await addDoc(collection(db, "Blogs"), {
      title: formData.title,
      content: formData.content,
      CreatedOn: new Date(),
    });
    // console.log("Document written with ID: ", docRef.id);

    // dispatch({
    //   type: "Add",
    //   blog: { title: formData.title, content: formData.content },
    // });

    // setTitle("");
    // setcontent("");
    setFormData({ title: "", content: "" });
    titleRef.current.focus();
  }

  async function removeBlog(id) {
    // setBlogs(blogs.filter((blog, index) => i !== index));
    // // dispatch({ type: "Remove", index: i });
    await deleteDoc(doc(db, "Blogs", id));
  }

  return (
    <>
      {/* Heading of the page */}
      <h1>Write a Blog!</h1>
      {/* Division created to provide styling of section to the form */}
      <div className="section">
        {/* Form for to write the blog */}
        <form onSubmit={handleSubmit}>
          {/* Row component to create a row for first input field */}
          <Row label="Title">
            <input
              className="input"
              placeholder="Enter the Title of the Blog here.."
              ref={titleRef}
              value={formData.title}
              // onChange={(e) => setTitle(e.target.value)}
              onChange={(e) =>
                setFormData({
                  title: e.target.value,
                  content: formData.content,
                })
              }
            />
          </Row>

          {/* Row component to create a row for Text area field */}
          <Row label="Content">
            <textarea
              className="input content"
              placeholder="Content of the Blog goes here.."
              required
              value={formData.content}
              onChange={(e) =>
                setFormData({ title: formData.title, content: e.target.value })
              }
            />
          </Row>

          {/* Button to submit the blog */}
          <button className="btn">ADD</button>
        </form>
      </div>
      <hr />
      {/* Section where submitted blogs will be displayed */}
      <h2> Blogs </h2>
      {console.log(blogs)}
      {blogs.map((blog, i) => (
        <div className="blog" key={i}>
          <h3>{blog.title}</h3>
          <p>{blog.content}</p>
          {console.log(blog)}

          <div className="blog-btn">
            <button className="btn remove" onClick={() => removeBlog(blog.id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </>
  );
}

//Row component to introduce a new row section in the form
function Row(props) {
  const { label } = props;
  return (
    <>
      <label>
        {label}
        <br />
      </label>
      {props.children}
      <hr />
    </>
  );
}
