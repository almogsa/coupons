import { Link } from 'react-router-dom'
import { ReactComponent as DeleteIcon } from '../assets/svg/deleteIcon.svg'
import { ReactComponent as EditIcon } from '../assets/svg/editIcon.svg'
import bedIcon from '../assets/svg/bedIcon.svg'
import bathtubIcon from '../assets/svg/bathtubIcon.svg'
import checkIcon from '../assets/svg/checkIcon.svg'
import couponIcon from '../assets/svg/coupon.svg'
import { now } from 'moment'
import styled from 'styled-components'


export const Badge = styled.span`
   width:16px;
   height:16px;
   border-radius: 50%;
   background-color: ${props => props.inputColor || "palevioletred"};

`
function ListingItem({ listing, id, onEdit, onDelete }) {
    return (
        <li className="categoryListing">
            <Link
                to={`/category/${listing.type}/${id}`}
                className="categoryListingLink"
            >
            {/* {listing.imgUrls &&    <img
          src={listing.imgUrls[0] || ''}
          alt={listing.name}
          className='categoryListingImg'
        />
            } */}

                <div className="categoryListingDetails">
                    <p className="categoryListingLocation">
                        {listing.location}
                    </p>
                    <p className="categoryListingName">{`${listing.name} (${listing.type})`}</p>
                    <p className="categoryListingName">{listing.isNew}</p>

                    <p className="categoryListingPrice">
                      
                       <span style={{color:'gray', paddingRight: '5px'}}> {listing.regularPrice}</span> <span>/</span> <span style={{paddingLeft:'5px'}}>{listing.discountedPrice}</span>
                    
                    </p>
        
                    <div className="categoryListingInfoDiv">
                    {new Date(listing.dueDate) > (  new Date().setDate(new Date().getDate() - 7)) ?  <Badge inputColor="green"></Badge> :  <Badge></Badge>}
                        <img src={bedIcon} style={{width: '24px',height: '24px'}} alt="bed" />
                        <p className="categoryListingInfoText">
                            {
                                 `${listing.dueDate} `
                                }
                        </p>
                    
                        <img style={{width: '24px',height: '24px'}} src={couponIcon} alt="bath" />
                        <p className="categoryListingInfoText">
                            {listing.code}
                        </p>
                    </div>
                </div>
            </Link>

            {onDelete && (
                <DeleteIcon
                    className="removeIcon"
                    fill="rgb(231, 76,60)"
                    onClick={() => onDelete(listing.id, listing.name)}
                />
            )}

            {onEdit && (
                <EditIcon className="editIcon" onClick={() => onEdit(id)} />
            )}
        </li>
    )
}

export default ListingItem
