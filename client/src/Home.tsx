import logo from '/logo_ims.svg';
import illustration from '/illustration_home.png';
import { NavLink } from "react-router-dom"
import { useContext } from 'react';
import { ThemeContext } from "./ThemeContext.tsx";

function Home() {
    const value = useContext(ThemeContext);
    const setCategory = value.setCategory;

    return (
        <>
            <section id="Home">
                <img src={logo} className="logo" alt="In my shoes logo" />
            </section>
            <section id='Information' className='container column'>
                <div className='content-wrapper white-border'>
                    <div className='infro-wrapper'>
                        <h1>What is In My Shoes?</h1>
                        <p className='rich-text'><strong>inmyshoes</strong> is a platform for people to share their experiences a
                            nd learn from each other. We believe that everyone has a story to tell 
                            and that we can all learn from each other. We want to create a community 
                            where people can share their experiences and learn from each other.
                        </p>
                    </div>
                    <div className='illustration-wrapper'>
                        <img src={illustration} className="shoes-illustration" alt="shoe illustration" />
                    </div>
                </div>
            </section>
            <section id='PathDirection' className='column'>
                <div>
                    <NavLink to='/get-email' className='btn-primary' onClick={() => setCategory("worry")}>
                        <div className='btn-border'></div>
                        Are you worried about your future?
                    </NavLink>
                </div>
                <div>
                    <NavLink to='/get-age' className='btn-primary' onClick={() => setCategory("answer")}>
                        <div className='btn-border'></div>
                        Wanna help others with your learnings?
                    </NavLink>
                </div>
            </section>
        </>
    )
}

export default Home;