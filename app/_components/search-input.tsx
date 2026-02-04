import { SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const SearchInput = () => {
  return (
    <div className="flex intems-center gap-2">
      <Input className="rounded-full" type="text" placeholder="Pesquise serviços ou barbearias"/>
      <Button variant="default" size="icon" className="rounded-full">
        <SearchIcon className="w-6 h-6" />
      </Button>
    </div>
  );
};

export default SearchInput;