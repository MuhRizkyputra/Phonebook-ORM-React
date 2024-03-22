import { faArrowRotateLeft, faFloppyDisk, } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function FormUpdateAvatar({ UpdateAvatar, avatar, setAvatar }) {

    const navigate = useNavigate()
    const { id } = useParams()
    useEffect(() => {
        const fecthData = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/phonebooks/${id}`)
                const avatar = response.data.avatar
                setAvatar(avatar)
            } catch (eror) {
                console.log('ini eror Update  Avatar', eror)
            }
        }
        fecthData()
    }, [id])

    const [selectImages, setSelectedImages] = useState()

    const imagesChange = (event) => {
        if(event.target.files && event.target.files.length > 0) {
            setSelectedImages(event.target.files[0]);
            setAvatar(event.target.files[0])
        }
    }

    const submitAvatar = (event) => {
        event.preventDefault()
        UpdateAvatar(id, avatar)
        navigate('/')
    }

    return (
        <div className="container-avatar">
            <div className="header-avatar">
                <h1>Change Avatar</h1>
            </div>
            <form onSubmit={submitAvatar}>
                <div className="body-avatar">
                    <div className="img-avatar">
                        <label htmlfor="avatar">Avatar</label>
                        <input type="file" name="avatar" id="avatar" onChange={imagesChange} />
                    </div>
                    <div className="preview">
                        <label>Preview</label>
                        {(selectImages ? (
                            <img src={URL.createObjectURL(selectImages)} />
                        ) :
                            <img src={"http://localhost:3001/images/" + (avatar !== null ? `${avatar}` : 'Defaultavatar.png')} />
                        )}
                    </div>
                </div>
                <div className="footer-avatar">
                    <button type="submit">
                        <FontAwesomeIcon icon={faFloppyDisk} />
                    </button>
                    <Link to={'/'}>
                    <button>
                        <FontAwesomeIcon icon={faArrowRotateLeft} />
                    </button>
                    </Link>
                </div>
            </form>
        </div>
    )
}