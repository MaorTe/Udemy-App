import styled from 'styled-components';

export const NavbarContainer = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
   background: whitesmoke;
`;
export const ul = styled.ul`
   display: flex;
   justify-content: center;
   align-items: center;
   margin: 10px 0;
   width: 300px;
`;
export const li = styled.li`
   list-style-type: none;
`;
export const Marginer = styled.div`
   padding-bottom: 15px;
   border-bottom: 2px solid #e7ecf5;
   border-bottom: ${({ active }) => active && '2px solid #1c1d1f'};
`;

export const NavLink = styled.button`
   padding: 10px 5px;
   text-decoration: none;
   color: #6a6f73;
   font-size: 0.9rem;
   font-weight: bold;
   color: ${({ active }) => active && '#1c1d1f'};
   &:hover {
      color: #1c1d1f;
   }
`;
