
import { React, useState } from 'react';
import { MDBInputGroup, MDBInput, MDBIcon, MDBAlert, MDBBtn } from 'mdb-react-ui-kit';

export const Search = () => {
    const data = ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight'];

    const [showSearchAlert, setShowSearchAlert] = useState(false);

    return (
        <>
            <div class="search-container">
                <form action="/action_page.php">
                    <input id="search-input" type="text" placeholder="Search by tags, notes, and titles" name="search"/>
                        <button type="submit"><i class="fa fa-search"></i></button>
                </form>
            </div>
        </>
    );
}