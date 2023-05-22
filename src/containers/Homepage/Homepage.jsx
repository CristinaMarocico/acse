import React from 'react';
import '../Homepage/Homepage.scss';
// import { Link } from 'react-router-dom';
import '../../resources/main.scss';
import Header from "../../components/Header/Header";
import ReactPlayer from 'react-player'
import { Link, animateScroll as scroll } from "react-scroll";
import Slider from "react-slick";
import teamJson from './team.json'
import { clientsService } from "../../services/ClientsService";
import NotificationSystem from 'react-notification-system';
import NotificationSystemStyle from '../../constants/NotificationSystemStyle';

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
            moreDescription:false,
            topVisible: true,
            team: teamJson
        }
        this.notificationSystem = React.createRef();
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
    toggleMoredDescription = () => {
        let moreDescription = this.state.moreDescription;
        moreDescription = !moreDescription;
        this.setState({ moreDescription })
    }
    updateField = event => {
        event.preventDefault()
        const field = event.target.name;
        let contactInfo = { ...this.state.contactInfo };
        contactInfo[field] = event.target.value;
        this.setState({ contactInfo })
    }
    handleSubmit = event => {
        event.preventDefault();
        const notification = this.notificationSystem.current;
        clientsService.createOrUpdate(this.state.contactInfo).then(response => {
            notification.addNotification({
                message: 'Mesajul a fost trimis cu success.',
                level: 'success',
                position: 'tc'
            });
        })
            .catch(err => {
                notification.addNotification({
                    message:
                        'A aparut o problema, faceti refresh la pagina sau contactati administratorul daca problema persista.',
                    level: 'error',
                    position: 'tc'
                });
            })
    }
    render() {
        var settings = {
            infinite: false,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            swipeable: true,
            centerMode: true,
            dots: true,
            adaptiveHeight: true,
            centerMode: true,
            centerPadding: '0',
            swipe: true,
            arrows:false
        };

        return (
            <div className='standard homepage'>
                <div className='homepage__top-wrapper'>
                    {this.state.topVisible ? <div className='homepage__top'>
                        <a href={`tel:+40740491335`} className='standard__link' >
                            <div className='homepage__call'>
                                <img src='/images/call.png' alt='phone' className='homepage__call' />
                                <h5 className='homepage__phone'>+40740491335</h5>
                            </div>
                        </a>

                        <a
                                className='standard__link'
                                href={`https://www.facebook.com/profile.php?id=100092663620969`} target="_blank"
                                rel="noopener noreferrer"> <div className='homepage__social-top'>
                            <img src='/images/facebook-white.png' alt='facebook' />
                        </div></a>


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
                        <Link to="info" duration={800} smooth={true} className='standard__link'><button className='homepage__more'>Află mai multe</button></Link>

                    </div>

                    <div className='homepage__sub-section'>
                        <img src='/images/speed.png' alt='horse' className='homepage__speed-icon' />
                        <h3>Pășește cu eleganță în lumea echitației!</h3>
                    </div>
                    <div className='homepage__about-us-section homepage__about-us-section-background'>
                        <div className='homepage__subsection'>
                            <h3 className='homepage__subtitle'>Despre noi</h3>
                            <div className='homepage__line' />
                            <p className='homepage__description'>Asociaţia Club Sportiv Ecvestru Alba Iulia a luat fiinţă în anul 2021, din iniţiativa unor oameni pasionaţi de sportul ecvestru, dornici să dezvolte aceast sport nobil în zona de centru a ţării.</p>
                            <p className='homepage__description'>Scopul Clubului îl constituie desfășurărea de activităţi sportive ecvestre, respectiv selecționarea, iniţierea și pregătirea de sportivi în acest domeniu, participarea la competiţii sportive interne și internaţionale, precum și alte activităţi conexe acestora.</p>
                            <p className='homepage__description'>Activitatea se desfășoară într-o bază hipică primitoare, care dispune de toate facilităţile impuse de Federaţia Ecvestră Română, precum manej interior, două terenuri de antrenament, unul de nisip și celălalt de iarbă, pentru a diversifica suprafața de antrenament.</p>
                          {this.state.moreDescription? '' : 
                          <div className='homepage__more-details'>
                            <img src='/images/dots.png' alt='dots'/>
                            <p className='homepage__see-more-description' onClick={this.toggleMoredDescription}>Citește mai mult</p>
                            </div>} 
                           {this.state.moreDescription?
                           <div>
                            <p className='homepage__description'>O importanţă deosebită este acordată relaxării cailor. Astfel, baza hipică dispune de padocuri în aer liber. </p>
                            <p className='homepage__description'>Pentru transportul cailor, Clubul dispune de mijloace profesioniste, precum o autovană și două anhengere.</p>
                            <p className='homepage__description'>Activitatea se desfășoară sub atenta coordonare a trei antrenori abilitaţi de International Group for Equestrian Qualification , forul internațional sub tutela căruia își desfășoară activitatea antrenorii in disciplinele ecvestre.</p></div> :'' }
                            {this.state.moreDescription? <p className='homepage__see-more-description' onClick={this.toggleMoredDescription}>Vezi mai puțin</p> :''} 
                        </div>

                    </div>
                    <div className='homepage__offer'>
                        <div className='homepage__team-section'>
                            <h3 className='homepage__subtitle'>Echipa noastră</h3>
                            <div className='homepage__line' />
                            <div className='homepage__slider standard__only-mobile' >
                                <Slider  {...settings} className='homepage__real-slider'>
                                    {this.state.team.map(teammate => (
                                        <div key={teammate.id} className='homepage__singular-slider'>
                                            <img src={teammate.img} className='homepage__slider-img' alt={teammate.name} />
                                            <div className='homepage__slider-info-section'>
                                                <h3 className='homepage__slider-title'>{teammate.name}</h3>
                                                <p className='homepage__top-info'>{teammate.description}</p>
                                            </div>

                                        </div>
                                    ))}
                                </Slider>
                            </div>

                            <div className='homepage__team-desktop standard__only-desktop'>
                                {this.state.team.map(teammate => (
                                    <div key={teammate.id} className='homepage__singular-slider'>
                                        <img src={teammate.img} className='homepage__slider-img' alt={teammate.name} />
                                        <div className='homepage__slider-info-section'>
                                            <h3 className='homepage__slider-title'>{teammate.name}</h3>
                                            <p className='homepage__top-info'>{teammate.description}</p>
                                        </div>

                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className='homepage__about-us-section homepage__offer-section' id="info">
                            <h3 className='homepage__subtitle'>Ce oferim</h3>
                            <div className='homepage__line' />
                            <h4>Oferim lecții de echitație pe bază de programare telefonică.</h4>
                            <div className='homepage__lessons'>
                                <img src='/images/lectie-1.jpg' alt='echitatie' className='homepage__lesson-img' />
                                <img src='/images/lectie-2.jpg' alt='echitatie' className='homepage__lesson-img homepage__lesson-img-2' />
                            </div>
                            <a href={`tel:+40740491335`} className='standard__link'>   <button className='homepage__more homepage__call-us'>Sună-ne</button> </a>

                        </div>

                        <div className='homepage__about-us-section homepage__camps-info-section'>
                            <h3 className='homepage__subtitle'>Noutăți</h3>
                            <div className='homepage__line' />
                            <h4 className='homepage__camps-description'>Organizam în această vară o serie de tabere pentru iniţierea copiilor în sportul ecvestru care includ:</h4>
                            <div className='homepage__camp'>
                                <div className='homepage__camp-box'>
                                    <div className='homepage__camp-images'>
                                        <img src='/images/horse-1.jpg' alt='horses' className='homepage__horse-img' />
                                        <img src='/images/horse-2.jpg' alt='horses' className='homepage__horse-img homepage__horse-img-2' />
                                    </div>
                                    <div className='homepage__camp-text'>
                                        <div className='homepage__benefit'>
                                            <img src='/images/check.png' alt='benefit' />
                                            <h4>Cunoașterea cailor</h4>
                                        </div>
                                        <div className='homepage__benefit'>
                                            <img src='/images/check.png' alt='benefit' />
                                            <h4>Lecții zilnice de echitație</h4>
                                        </div>
                                        <div className='homepage__benefit'>
                                            <img src='/images/check.png' alt='benefit' />
                                            <h4>Jocuri interactive</h4>
                                        </div>
                                        <div className='homepage__benefit'>
                                            <img src='/images/check.png' alt='benefit' />
                                            <h4>Cazare la pensiune de 3 stele</h4>
                                        </div>
                                        <div className='homepage__benefit'>
                                            <img src='/images/check.png' alt='benefit' />
                                            <h4>Mese incluse</h4>
                                        </div>
                                        <div className='homepage__price'>
                                            <h4>Preț: 2500 RON</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='homepage__about-us-section homepage__camps-info-section homepage__when-section'>
                            <h3 className='homepage__subtitle'>Când?</h3>
                            <div className='homepage__line' />
                            <div className='homepage__date-box'>
                                <img src='/images/calendar.png' alt='calendar' className='homepage__calendar' />
                                <h3>4-8 iulie 2023</h3>
                            </div>
                            <h4 className='homepage__or'>sau</h4>
                            <div className='homepage__date-box'>
                                <img src='/images/calendar.png' alt='calendar' className='homepage__calendar' />
                                <h3>21-25 iulie 2023</h3>
                            </div>
                        </div>
                    </div>


                    <div className='homepage__about-us-section homepage__about-us-section-background homepage__form-background'>
                        <h3 className='homepage__subtitle homepage__white-subtitle'>Înscrie-te!</h3>
                        <div className='homepage__line' />
                        <form className='homepage__form' onSubmit={this.handleSubmit}>
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
                                    <option value="4-8 iulie">4-8 iulie</option>
                                    <option value="21-25 iulie">21-25 iulie</option>
                                </select>
                            </div>
                            <button className='homepage__submit' type='submit'>Trimite mesajul</button>
                        </form>
                    </div>

                    <div className='homepage__footer'>
                        <img src='/images/logo.svg' alt='logo' className='homepage__footer-logo' />
                        <a href={`tel:+40740491335`} className='standard__link homepage__footer-box' >
                            <img src="/images/phone.png" alt='phone' />
                            <h5>+40740491335</h5>
                        </a>
                        <div className='homepage__footer-box'>
                            <img src="/images/email.png" alt='phone' />
                            <h5>contact@acse-albaiulia.ro</h5>
                        </div>
                        <div className='homepage__footer-box'>
                            <img src="/images/location.png" alt='phone' />
                            <h5>Vintu de Jos, Jud. Alba </h5>
                        </div>



                        <div className='homepage__social'>
                            <a
                                className='standard__link'
                                href={`https://www.facebook.com/profile.php?id=100092663620969`} target="_blank"
                                rel="noopener noreferrer">  <img src='/images/facebook.png' alt='facebook' /></a>

                        </div>
                    </div>

                </div>
                <NotificationSystem
                    ref={this.notificationSystem}
                    style={NotificationSystemStyle}
                />
            </div>
        )
    }
}
export default Homepage;