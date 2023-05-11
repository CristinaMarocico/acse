import React from 'react';
import '../Homepage/Homepage.scss';
import { Link } from 'react-router-dom';
import '../../resources/main.scss';
import Header from "../../components/Header/Header";
import ReactPlayer from 'react-player'

class Homepage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            videoPlaying: true,
            contactInfo: {
                name: '',
                age: '',
                phone: '',
                period: ''

            },
            topVisible: true
        }
    }
    toggleVideo = () => {
        let videoPlaying = this.state.videoPlaying;
        videoPlaying = !videoPlaying;
        this.setState({ videoPlaying })
    }
    toggleTop = () => {
        let topVisible = this.state.topVisible;
        topVisible = !topVisible;
        this.setState({ topVisible })
    }
    updateField = event => {
        event.preventDefault()
        const field = event.target.name;
        let contactInfo = { ...this.state.contactInfo };
        contactInfo[field] = event.target.value;
        this.setState({ contactInfo })
    }
    render() {
        return (
            <div className='standard homepage'>
                <div className='homepage__top-wrapper'>
                    {this.state.topVisible ? <div className='homepage__top'>
                        <div className='homepage__call'>
                            <img src='/images/call.png' alt='phone' className='homepage__call' />
                            <h5 className='homepage__phone'>+40740491335</h5>
                        </div>

                        <div className='homepage__social-top'>
                            <img src='/images/facebook-white.png' alt='facebook' />
                            <img src='/images/instagram-white.png' alt='instagram' />

                        </div>


                    </div> : ''}
                    <img src={this.state.topVisible ? '/images/up.png' : '/images/contact.png'} alt='close' className={this.state.topVisible ? 'homepage__close' : 'homepage__contact'} onClick={this.toggleTop} />
                </div>

                <div className='homepage__banner'>
                    <div className='homepage__player-wrapper'>
                        <img src='/images/logo.svg' alt='logo' className='homepage__logo' />
                        <ReactPlayer
                            className='homepage__react-player'
                            url='/videos/horse-riding.mp4'
                            width='100%'
                            height='100%'
                            objectFit='cover'
                            playing={this.state.videoPlaying}
                            loop={true}
                            muted={true}
                            allow='autoplay; encrypted-media'
                            onClick={this.toggleVideo}
                        />

                    </div>
                    <div className='homepage__banner-box'>

                        <h2> ACSE ALBA IULIA</h2>
                        <h2> Club Sportiv Ecvestru </h2>
                        <button className='homepage__more'>Află mai multe</button>

                    </div>
                    <div className='homepage__about-us-section homepage__about-us-section-background'>
                        <div className='homepage__subsection'>
                        <h3 className='homepage__subtitle'>Despre noi</h3>
                        <div className='homepage__line' />
                        <p className='homepage__description'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        </div>
                        
                    </div>

                    <div className='homepage__about-us-section homepage__camps-info-section'>
                        <h3 className='homepage__subtitle'>Ce oferim</h3>
                        <div className='homepage__line' />
                        <div className='homepage__camp'>
                            <div className='homepage__camp-box'>
                                <div className='homepage__camp-images'>
                                    <img src='/images/horse-1.jpg' alt='horses' className='homepage__horse-img' />
                                    <img src='/images/horse-2.jpg' alt='horses' className='homepage__horse-img homepage__horse-img-2' />
                                </div>
                                <div className='homepage__camp-text'>
                                    <div className='homepage__benefit'>
                                        <img src='/images/check.png' alt='benefit' />
                                        <h4>Exemplu de beneficiu</h4>
                                    </div>
                                    <div className='homepage__benefit'>
                                        <img src='/images/check.png' alt='benefit' />
                                        <h4>Exemplu de beneficiu</h4>
                                    </div>
                                    <div className='homepage__benefit'>
                                        <img src='/images/check.png' alt='benefit' />
                                        <h4>Exemplu de beneficiu</h4>
                                    </div>
                                    <div className='homepage__benefit'>
                                        <img src='/images/check.png' alt='benefit' />
                                        <h4>Exemplu de beneficiu</h4>
                                    </div>
                                    <div className='homepage__benefit'>
                                        <img src='/images/check.png' alt='benefit' />
                                        <h4>Exemplu de beneficiu</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='homepage__about-us-section homepage__camps-info-section'>
                        <h3 className='homepage__subtitle'>Când?</h3>
                        <div className='homepage__line' />
                        <div className='homepage__date-box'>
                            <img src='/images/calendar.png' alt='calendar' className='homepage__calendar' />
                            <h3>3-8 iulie 2023</h3>
                        </div>
                        <h4 className='homepage__or'>sau</h4>
                        <div className='homepage__date-box'>
                            <img src='/images/calendar.png' alt='calendar' className='homepage__calendar' />
                            <h3>10-14 iulie 2023</h3>
                        </div>
                    </div>

                    <div className='homepage__about-us-section homepage__about-us-section-background homepage__form-background'>
                        <h3 className='homepage__subtitle homepage__white-subtitle'>Contactează-ne!</h3>
                        <div className='homepage__line' />
                        <form className='homepage__form'>
                            <div className='homepage__input-box homepage__small-field'>
                                <h3 className='homepage__label'>Nume:</h3>
                                <input
                                    className="homepage__field"
                                    type="text"
                                    name="name"
                                    required
                                    onChange={this.updateField}
                                    value={this.state.contactInfo.name}
                                    placeholder="Nume si prenume*"
                                />
                            </div>
                            <div className='homepage__input-box homepage__small-field'>
                                <h3 className='homepage__label'>Vârstă:</h3>
                                <input
                                    className="homepage__field"
                                    type="number"
                                    name="age"
                                    required
                                    onChange={this.updateField}
                                    value={this.state.contactInfo.age}
                                    placeholder="Vârstă*"
                                />
                            </div>
                            <div className='homepage__input-box homepage__small-field'>
                                <h3 className='homepage__label'>Număr de telefon:</h3>
                                <input
                                    className="homepage__field"
                                    type="number"
                                    name="phone"
                                    required
                                    onChange={this.updateField}
                                    value={this.state.contactInfo.phone}
                                    placeholder="Telefon*"
                                />
                            </div>
                            <div className='homepage__input-box'>
                                <h3 className='homepage__label'>Perioada:</h3>
                                <select
                                    className="homepage__field"
                                    value={this.state.contactInfo.period}
                                    required
                                    name="period"
                                    onChange={this.updateField}
                                >
                                    <option value="">Perioada</option>
                                    <option value="3-8 iulie">3-8 iulie</option>
                                    <option value="10-14 iulie">10-14 iulie</option>
                                </select>
                            </div>
                        </form>
                    </div>

                    <div className='homepage__footer'>
                        <img src='/images/logo.svg' alt='logo' className='homepage__footer-logo' />
                        <div className='homepage__footer-box'>
                            <img src="/images/phone.png" alt='phone' />
                            <h5>+40740491335</h5>
                        </div>
                        <div className='homepage__footer-box'>
                            <img src="/images/email.png" alt='phone' />
                            <h5>email@emailescu.router</h5>
                        </div>
                        <div className='homepage__footer-box'>
                            <img src="/images/location.png" alt='phone' />
                            <h5>Vintu de Jos, Jud. Alba </h5>
                        </div>
                        


                        <div className='homepage__social'>
                            <img src='/images/facebook.png' alt='facebook' />
                            <img src='/images/intagram.png' alt='instagram' />

                        </div>
                    </div>

                </div>
            </div>
        )
    }
}
export default Homepage;