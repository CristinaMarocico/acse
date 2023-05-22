import React from 'react';
import './Admin.scss';
import '../../resources/main.scss';
import { clientsService } from '../../services/ClientsService'
import { errorService } from "../../services/ErrorService";
import ReactPaginate from 'react-paginate';
import Moment from 'react-moment';


class Admin extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            clients: [],
            pagination: {}
        }
    }
    componentDidMount() {
        clientsService.getClients().then(response => {
            let clients = this.state.clients;
            clients = response.data.contacts;
            this.setState({ clients });
        })
            .catch(error => {
                if (error.response.status === 401) {
                    errorService.handleUnauthorized();
                    // this.props.history.push("/login");
                }
            })
    }
    handlePageClick = selectedPage => {
        clientsService
            .getClients(selectedPage.selected + 1)
            .then(jsonResponse => {
                this.setPaginationState(jsonResponse);
            })
            .catch(error => {
                console.log(error);
            });
    };
    setPaginationState = response => {
        let pagination = { ...this.state.pagination };
        pagination = response.data.pagination;
        this.setState({
            pagination
        });
        let clients = this.state.clients;
        clients = response.data.clients;

        this.setState({ clients });
    };
    render() {
        return (
            <div className='standard admin'>
                <h3 className='admin__title'>Clienți ACSE</h3>
                <div className='admin__line' />
                <div className='admin__table-wrapper'>
                    <div className="admin__table">
                        <div className='admin__head'>
                            <h3 className="admin__head-title">Nume</h3>
                            <h3 className="admin__head-title">Vârstă</h3>
                            <h3 className="admin__head-title">Telefon</h3>
                            <h3 className="admin__head-title">Perioadă tabără</h3>
                            <h3 className="admin__head-title">Data aplicării</h3>
                        </div>
                        {this.state.clients ?
                            <div>
                                {this.state.clients.map(client => (
                                    <div className='admin__row' key={client.id}>
                                        <div className='admin__cell'>
                                            <h4>{client.name}</h4>
                                        </div>

                                        <div className='admin__cell'>
                                            <h4>{client.age} ani</h4>
                                        </div>

                                        <div className='admin__cell'>
                                            <h4>{client.phone}</h4>
                                        </div>
                                        <div className='admin__cell'>
                                            <h4>{client.period}</h4>
                                        </div>
                                        <div className='admin__cell'>
                                      <h4><Moment format="DD/MM/YYYY" date={client.updated_at}>  </Moment></h4>  
                                        </div>
                                    </div>
                                ))}
                            </div> : <h4 className='admin__no-clients'>Încă nu sunt clienți adăugați.</h4>}
                    </div>
                </div>

                {this.state.pagination && this.state.pagination.last_page > 1 && (
                    <ReactPaginate
                        previousLabel={'<'}
                        nextLabel={'>'}
                        breakLabel={'...'}
                        breakClassName={'break-me'}
                        pageCount={this.state.pagination.last_page}
                        marginPagesDisplayed={1}
                        pageRangeDisplayed={2}
                        onPageChange={this.handlePageClick}
                        containerClassName={'pagination'}
                        subContainerClassName={'pages pagination'}
                        activeClassName={'active'}
                    />
                )}
            </div>
        )
    }
}

export default Admin;