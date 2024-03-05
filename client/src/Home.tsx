import logo from '/logo_ims.svg';
// import illustration from '/illustration_home.png';
import { NavLink } from "react-router-dom"
import { useContext } from 'react';
import { ThemeContext } from "./ThemeContext.tsx";
import { useInView } from 'react-intersection-observer';

function Home() {
    const value = useContext(ThemeContext);
    const setCategory = value.setCategory;

    const [ref, inView] = useInView({
        /* Optional options */
        threshold: 0,
    });

    return (
        <>
            <section id="Home">
                <div ref={ref}>
                    <img src={logo} className={inView ? "logo-intro up-animation" : "logo-intro"} alt="In my shoes logo" />
                </div>
            </section>
            <section id='Information' className='container column'>
                <div className='content-wrapper'>
                    <div className='header'>
                        <h2>What is inmyshoes?</h2>
                    </div>
                    <div className='richtext-container white-border'>
                        <p className='rich-text'>
                            <strong>
                            <span className='text-bigger'>inmyshoes is a platform for people to share worries with older people who can share their advice.</span></strong> 
                            <br />
                            We believe that everyone has a story to tell
                            and that we can all learn from each other. We want to create a community 
                            where people can share their experiences and learn from each other.
                            
                        </p>
                    </div>
                </div>
            </section>
            <section id='PathDirection' className='column'>
                <div>
                    <NavLink to='/get-email'  onClick={() => setCategory("worry")}>
                        <div className='btn-primary'>
                            Are you worried about your future?
                            <div className='btn-border'></div>
                        </div>
                        
                    </NavLink>
                </div>
                <div>
                    <NavLink to='/get-age' onClick={() => setCategory("answer")}>
                        <div className='btn-primary'>
                            Wanna help others with your learnings?
                            <div className='btn-border'></div>
                        </div>
                    </NavLink>
                </div>
            </section>
        </>
    )
}

export default Home;