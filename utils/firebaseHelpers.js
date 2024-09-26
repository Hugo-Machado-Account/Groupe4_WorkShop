// Dans TicketListScreen.js
import { useTickets } from '../hooks/useTickets';

const TicketListScreen = () => {
  const { tickets, loading, error } = useTickets();

  if (loading) return <LoadingComponent />;
  if (error) return <ErrorComponent message={error} />;

  return (
    <FlatList
      data={tickets}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <TicketItem ticket={item} />}
    />
  );
};