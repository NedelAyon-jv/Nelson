from mpi4py import MPI

comm = MPI.COMM_WORLD
rank = comm.Get_rank()
size = comm.Get_size()

data = None
request = None

if rank == 0:
    data = 100
    request = comm.Isend([data, MPI.INT], dest=1, tag=0)
    print(f"Proceso {rank}: Enviando datos de manera no bloqueante...")
    request.Wait()  
elif rank == 1:
    data = None
    data = comm.recv(source=0, tag=0) 
    print(f"Proceso {rank}: Datos recibidos: {data}")
