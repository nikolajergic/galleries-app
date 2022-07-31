import React, {useEffect, useState} from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getGallery, deleteGallery } from "../store/galleries/slice";
import { selectGallery } from "../store/galleries/selectors";
import useFormattedDate from '../hooks/useFormattedDate';
import { selectIsAuthenticated, selectActiveUser } from "../store/auth/selectors";
import { format } from 'date-fns';
import { Carousel } from "react-bootstrap";

export default function Gallery(){
    const dispatch = useDispatch();
    const { id } = useParams();
    const gallery = useSelector(selectGallery);
    const formattedDate = useFormattedDate(gallery ? gallery.created_at : "", "dd-MM-yyyy HH:mm");
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const activeUser = useSelector(selectActiveUser);
    const history = useHistory();

    useEffect(() => {
        dispatch(getGallery(id));
    }, 
    [id, dispatch]);


    const handleDeleteGallery = () => {
        const response = prompt("Are you sure you want to delete your gallery? If so, type 'yes' ");
        if (response !== "yes"){
            return;
        }
        dispatch(deleteGallery(id));
        setTimeout(() => {
            history.push("/galleries/me");
        }, 1500);
    }

    return (
        <div>
            <div
                style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                border: "solid",
                margin: "5px",
                fontSize: "10px",
                backgroundColor: "red",
                boxSizing: "border-box",
                }} 
            >
            {gallery ? (
                <>
                    <h1 style={{ padding: "10px" }}>
                      {gallery?.title}
                    </h1>

                    <h3 style={{ padding: "10px", color: "red" }}>
                      By: <Link to={`/authors/${gallery?.user?.id}`} style={{color: "red" }}>{gallery?.user?.first_name} {gallery?.user?.last_name}</Link>
                    </h3>

                    {formattedDate === "unknown" ? (
                        <div style={{ padding: "10px" }}>
                        Unknown date
                      </div>
                      ) : (
                          <div style={{ padding: "10px" }}>
                          Created at: {formattedDate}
                        </div>
                      )}

                    <div>
                    <Carousel>
                            {gallery.images && gallery.images.length ?
                                gallery.images.map((image, index) => (
                                    <Carousel.Item key={image.id} interval={7000}>
                                        <a key={index} rel="noreferrer" target="_blank" href={image.url}>
                                            <img className="d-block w-100" key={image.id} src={image.url} alt="Gallery carousel element" />
                                        </a>
                                    </Carousel.Item>
                                )) :
                                "No images found"
                            }
                    </Carousel>
                    </div>
                    <div>
                        {gallery && gallery.description ? (
                            <p>{gallery.description}</p>
                        ) : (
                            <p>No Descripton</p>
                        )}
                    </div>
                    {activeUser && (activeUser.id === gallery.user_id) ? (
                        <Link to={`/edit-gallery/${gallery.id}`}>Edit Gallery</Link>
                    ) : (
                        <></>
                    )}
                    {activeUser && (activeUser.id === gallery.user_id) ? (
                        <button onClick={handleDeleteGallery}>Delete gallery</button>
                    ) : (
                        <></>
                    )}
                </>
            ) : (
                <div>Loading...</div>
                )}

            </div>
            
        </div>

    );
}