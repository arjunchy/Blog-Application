import { Button, Table, TableBody, TableCell, TableHead, TableRow, styled } from "@mui/material";
import { categories } from "../../constants/data";
import { Link, useSearchParams } from "react-router-dom";

const StyledTable = styled(Table)`
  border: 1px solid rgba(224, 224, 224, 1);
  margin-top: 20px;
  border-radius: 8px;
`;

const StyledButton = styled(Button)`
  margin: 20px;
  width: 100%;
  background-color: rgb(245, 0, 86);
  color: #fff;
  &:hover {
    background-color: rgb(220, 0, 76);
  }
  border-radius: 5px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  &:hover {
    text-decoration: underline;
  }
`;

const StyledTableCell = styled(TableCell)`
  font-size: 1rem;
  font-weight: 500;
  color: #333;
  padding: 12px 16px;
`;

const Categories = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  return (
    <>
      <StyledLink to={`/create?category=${category || ""}`}>
        <StyledButton variant="contained">Create Blog</StyledButton>
      </StyledLink>

      <StyledTable>
        <TableHead>
          <TableRow>
            <StyledTableCell>
              <StyledLink to={"/"}>All Categories</StyledLink>
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category.id}>
              <StyledTableCell>
                <StyledLink to={`/?category=${category.type}`}>
                  {category.type}
                </StyledLink>
              </StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </StyledTable>
    </>
  );
};

export default Categories;
