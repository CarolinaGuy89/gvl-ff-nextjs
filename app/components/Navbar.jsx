'use client'
import { Button, Offcanvas } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import { useState } from "react";

export default function MenuButton(params) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    console.log("slug: ",params)
    return (
    <section className="menu-bar">
        <Button variant="primary" onClick={handleShow}>Menu &#9776;</Button>
        <Offcanvas show={show} placement='end' onHide={handleClose}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Menu:</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav defaultActiveKey="/home" className="flex-column">
              <Nav.Link href={`/${params.slug[0]}/home`}>Home</Nav.Link >
              <Nav.Link href={`/${params.slug[0]}/matchup`}>Weekly Matchup</Nav.Link>
              <Nav.Link href={`/${params.slug[0]}/team`}>My Team</Nav.Link>
              <Nav.Link href={`/${params.slug[0]}/draft`}>Draft Results</Nav.Link>
              <Nav.Link href="/">Change Leauge</Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </Offcanvas>
    </section>
    )
}