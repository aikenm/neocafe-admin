import React from 'react';
import '../styles/components/pagination.css';
import arrowLeftIcon from '../images/arrow-left.svg';
import arrowRightIcon from '../images/arrow-right.svg';

const Pagination = ({ currentPage, totalPages, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            paginate(currentPage + 1);
        }
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            paginate(currentPage - 1);
        }
    };

    return (
        <nav>
            <div className='pagination-block'>
            <button 
                    onClick={goToPreviousPage} 
                    disabled={currentPage === 1} 
                    className='page-link'
                >
                    <img src={arrowLeftIcon} alt='Prev' className='arrow-left-icon' />
                </button>
                {pageNumbers.map(number => (
                    <button 
                    key={number} 
                    onClick={() => paginate(number)} 
                    className={`page-link ${number === currentPage ? 'active' : ''}`}
                >
                    {number}
                </button>
                ))}
                <button 
                    onClick={goToNextPage} 
                    disabled={currentPage === totalPages} 
                    className='page-link'
                >
                    <img src={arrowRightIcon} alt='Next' className='arrow-right-icon' />
                </button>
            </div>
        </nav>
    );
};

export default Pagination;
