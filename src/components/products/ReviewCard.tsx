import Tabs, { type TabItem } from "@/components/ui/Tabs";
import ReviewList from "./ReviewList";

interface ReviewCardProps {
  description?: string;
}

export default function ReviewCard({ description }: ReviewCardProps) {
  const tabs: TabItem[] = [
    {
      label: "Product Details",
      content: (
        <div>
          <h2 className="text-lg font-bold">Product Details</h2>
          <p className="mt-3 whitespace-pre-line text-sm leading-6 text-gray-600">
            {description || "Product details will be available soon."}
          </p>
        </div>
      ),
    },
    {
      label: "Rating & Reviews",
      content: <ReviewList />,
    },
    {
      label: "FAQs",
      content: (
        <div>
          <h2 className="text-lg font-bold">Frequently Asked Questions</h2>
          <p className="mt-3 text-sm leading-6 text-gray-600">
            Product questions and answers will be available soon.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="mt-12 w-full">
      <Tabs tabs={tabs} defaultTab="Rating & Reviews" />
    </div>
  );
}
