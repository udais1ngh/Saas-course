
import { useSession, useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { SITE_URL } from "../utils";

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


export default function Navbars() {
    const user = useUser();
    const session = useSession();



    const supabaseClient = useSupabaseClient();



    function Logout() {
        supabaseClient.auth.signOut();

    }


    async function ManageBilling() {

        const response = await fetch(`${process.env.SITE_URL}/api/manage-billing`)
        const data = await response.json();

        if (data) {
            window.location.href = data.url;

        }


    }

    return (





        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary border-b-2 border-black">
            <Container>
                <Navbar.Brand href="/" className="font-bold ">CourseMonk</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">

                    </Nav>
                    <Nav>
                        {
                            !session && (
                                <div className="block md:flex gap-4 justify-center items-center">
                                    <Nav.Link className="text-black" href="/login">Login</Nav.Link>
                                    <Nav.Link className="text-black" href="/pricing">
                                        Pricing
                                    </Nav.Link>
                                </div>

                            )
                        }

                        {

                            session && (

                                <div className=" block md:flex gap-4 justify-center items-center">
                                    <Nav.Item className="cursor-pointer text-black" onClick={Logout}>Logout</Nav.Item>
                                    <Nav.Item className="cursor-pointer text-black" onClick={ManageBilling}>Billing</Nav.Item>
                                    <Nav.Link className=" text-black" href="/products">Products</Nav.Link>
                                </div>

                            )


                        }

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

    )


}



