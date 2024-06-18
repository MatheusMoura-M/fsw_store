"use client";

import { addProductToWishlist } from "@/actions/Wishlist";
import { StarIcon } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import LoadingButton from "../../../../components/ui/loading-button";
import { WishList } from "@prisma/client";

interface WishButtonProps {
  productId: string;
  wishLists: WishList[];
}
const WishButton = ({ productId, wishLists }: WishButtonProps) => {
  const { data: session } = useSession();

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleAddToWishlist = async () => {
    setLoading(true);
    if (!session || !session.user) {
      setLoading(false);

      return;
    }

    await addProductToWishlist(session.user.id, productId);

    router.refresh();

    setLoading(false);
  };

  return (
    <LoadingButton
      loading={loading}
      textWaiting="Adicionando aos favoritos"
      className="uppercase"
      onClick={handleAddToWishlist}
    >
      <StarIcon
        className={"h-5 w-5 " + (wishLists.length > 0 && "fill-white")}
      />
      Favoritos
    </LoadingButton>
  );
};

export default WishButton;
