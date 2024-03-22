import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import './App.css';
import React, { useEffect, useState } from 'react'
import PhoneBox from './components/PhoneBox';
import axios from 'axios';
import FormAdd from './components/FormAdd';
import FormUpdateAvatar from './components/FormUpdateAvatar';

function App() {
  const [user, setUser] = useState({ name: '', phone: '' })
  const [sort, setSort] = useState('asc')
  const [item, setItem] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [keyword, setKeyword] = useState('')
  const formData = new FormData()
  const [avatar, setAvatar] = useState(null)
  const [totalPages , setTotalPages] = useState(1)
  const [page, setPage] = useState(1)
 


  const readData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/phonebooks', {
        params: {
          keyword,
          page,
          sort,
          limit: 42
        }
      })
      const { phonebook , pages} = await response.data
      if (phonebook) {
        setItem(phonebook)
        setTotalPages(pages)
      }
    } catch (error) {
      throw error
    }
    finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    readData()
  }, [keyword, sort])

  const UpdateData = (id, { name, phone }) => {
    axios.put(`http://localhost:3001/api/phonebooks/${id}`, { name, phone }).then((response) => {
      setItem((prevData) => [
        ...prevData.slice(0, prevData.findIndex(data => data.id === response.data.id)),
        {
          id: response.data.id,
          name: response.data.name,
          phone: response.data.phone,
          avatar: response.data.avatar
        },
        ...prevData.slice(prevData.findIndex(data => data.id === response.data.id) + 1),
      ]);
    }).catch((eror) => {
      window.alert(eror, 'your cant update')
    })
  }

  function DeleteItem(userId) {
    axios.delete(`http://localhost:3001/api/phonebooks/${userId}`).then((response) => {
      setItem(item.filter(data => data.id !== userId))
    }).catch(eror => window.alert(eror, 'your cant delete'))
  }

  const UpdateAvatar = (id, avatar) => {
    formData.append('avatar', avatar)
    axios.put(`http://localhost:3001/api/phonebooks/${id}/avatar`, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }).then((response) => {
      setItem((prevData) => [
        ...prevData.slice(0, prevData.findIndex(data => data.id === response.data.id)),
        {
          id: response.data.id,
          name: response.data.name,
          phone: response.data.phone,
          avatar: response.data.avatar
        },
        ...prevData.slice(prevData.findIndex(data => data.id === response.data.id) + 1),
      ])
    }).catch((eror) => {
      window.alert(eror, 'error')
    })
  }

  const handleScroll = async () => {
    if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight && !isLoading) {
      try {
        if (page < totalPages) {
          setIsLoading(true)
          const newPage = page + 1
          setPage(newPage);
          const dataBaru = await axios.get(`http://localhost:3001/api/phonebooks`, {
            params: {
              page: newPage,
              sort: sort,
              limit: 42,
              keyword: keyword
            }
          })
          setItem(prevItem => [...prevItem, ...dataBaru.data.phonebook])
        }
        else {
          setIsLoading(false)
        }
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }
  }
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, [totalPages, keyword, sort, page])

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout />} />
        <Route index element={<PhoneBox
          sort={sort}
          setSort={setSort}
          item={item}
          setItem={setItem}
          keyword={keyword}
          setKeyword={setKeyword}
          UpdateData={UpdateData}
          user={user}
          setuser={setUser}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          Delete={DeleteItem}
          page={page}
          setPage={setPage}
        />} />
        <Route path='/add' element={<FormAdd
          user={user}
          setUser={setUser}
          item={item}
          setItem={setItem}
          sort={sort}
          setSort={setSort}
        />} />
        <Route path='/:id/avatar' element={<FormUpdateAvatar
          UpdateAvatar={UpdateAvatar}
          avatar={avatar}
          setAvatar={setAvatar}
          item={item}
          user={user}
        />} />
      </Routes>
    </Router>
  );
}
function Layout() {
  return (
    <Outlet />
  )
}

export default App;
