import styled from 'styled-components';

export const FavCourseBtn = styled.div`
   text-align: center;
`;
export const CardBtn = styled.button`
   padding: 5px 10px;
   font-size: 16px;
   border: none;
   outline: none;
   border-radius: 10px;
   background: #384a68;
   color: #fff;
   -webkit-transition: 0.3s all;
   transition: 0.3s all;
   width: 150px;
   margin: 5px 0;
   cursor: pointer;
   :disabled {
      opacity: 0.4;
   }
   &:hover {
      box-shadow: 0px 0px 8px 0px #333;
   }
`;
