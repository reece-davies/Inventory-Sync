import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

//import addGroup from './../assets/screenshots/add-group.png';

const HomePage = () => {


    return (
        <div className="home-page">
            <h2>What is Inventory-Sync?</h2>
            <p>
                Inventory-Sync is a web-based inventory management application built using the MERN stack (MongoDB, Express, React, Node.js). It allows users to efficiently track and manage inventory items by assigning them to specific groups, updating their status, and maintaining detailed descriptions.
            </p>
            <h3>Groups</h3>
            <p>Groups serve as categories or types of inventory. You can add a group on the 'Groups' page by clicking the 'Add Group' button at the top. All groups will be displayed in a list and can be edited or deleted using the corresponding buttons in the table. NOTE: A group cannot be deleted if there are inventory items assigned to it.</p>

            <h3>Inventory</h3>
            <p>Inventory items can be created, edited, and deleted in a similar way to groups, but from the 'Inventory' page. The key difference is that inventory items are more detailed and must be assigned a status and to specific group. NOTE: Inventory items can only be created if there is at least one group to assign them to.</p>
        </div>
    );
};

export default HomePage;
